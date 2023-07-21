const express = require('express');
const { Review, Store, Admin } = require('../../models');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth, async (req, res) => {
  const { review, taste_rating, service_rating, price_rating, hygiene_rating, storeId } = req.body;
  const { adminId } = req.userData;
  try {
    const newReview = await Review.create({
      review, taste_rating, service_rating, price_rating, hygiene_rating, storeId, adminId
    });

    return res.json(newReview);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
      const reviews = await Review.findAll({ include: [
        { model: Store },
        {
          model: Admin,
          attributes: ['nickname']
        }
      ] });

      return res.json(reviews);
  } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const review = await Review.findByPk(id, { include: [
        { model: Store },
        {
          model: Admin,
          attributes: ['nickname']
        }
      ] });
      if (review) {
          return res.json(review);
      } else {
          return res.status(404).json({ error: 'Review not found' });
      }
  } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
  }
});

router.put('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const { adminId } = req.userData;
  const { review, taste_rating, service_rating, price_rating, hygiene_rating, storeId } = req.body;

  try {
    const targetReview = await Review.findOne({ where: { id, adminId } });

    if (targetReview) {
      await targetReview.update({
        review, taste_rating, service_rating, price_rating, hygiene_rating, storeId
      });

      return res.json({ message: 'Review updated successfully' });
    } else {
      return res.status(404).json({ error: 'Review not found or not owned by the current user' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});


router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const { adminId } = req.userData;

  try {
    const targetReview = await Review.findOne({ where: { id, adminId } });

    if (targetReview) {
      await targetReview.destroy();
      return res.json({ message: 'Review deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Review not found or not owned by the current user' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});


module.exports = router;
