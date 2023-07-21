const express = require('express');
const { Review } = require('../../models');
const router = express.Router();

router.post('/', async (req, res) => {
  const { review, address, name, category, rating } = req.body;

  try {
    const newReview = await Review.create({
      review, address, name, category, rating
    });

    return res.json(newReview);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

router.get('/', async (req, res) => {
  try {
      const reviews = await Review.findAll();
      return res.json(reviews);
  } catch (err) {
      console.log(err);
      return res.status(500).json({ error: 'Something went wrong' });
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const review = await Review.findByPk(id);
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

router.put('/:id', async (req, res) => {
  const id = req.params.id;
  const { review, address, name, category, rating } = req.body;

  try {
    const targetReview = await Review.findByPk(id);

    if (targetReview) {
      await targetReview.update({
        review, address, name, category, rating
      });

      return res.json({ message: 'Review updated successfully' });
    } else {
      return res.status(404).json({ error: 'Review not found' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});


router.delete('/:id', async (req, res) => {
  const id = req.params.id;

  try {
    const targetReview = await Review.findByPk(id);

    if (targetReview) {
      await targetReview.destroy();
      return res.json({ message: 'Review deleted successfully' });
    } else {
      return res.status(404).json({ error: 'Review not found' });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
