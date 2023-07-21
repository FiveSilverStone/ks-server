const express = require('express');
const router = express.Router();
const { Store, Review } = require('../../models');

// CREATE
router.post('/', async (req, res) => {
    try {
        const store = await Store.create(req.body);
        res.status(201).json(store);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// READ
router.get('/', async (req, res) => {
    try {
        const includeReviews = req.query.includeReviews;
        const options = {};
        if (includeReviews === 'true') {
          options.include = Review;
        }
        const stores = await Store.findAll(options);
        res.json(stores);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const options = {};
        const includeReviews = req.query.includeReviews;
        if (includeReviews === 'true') {
          options.include = Review;
        }

        const store = await Store.findByPk(id, options);
        if (store) {
          res.json(store);
        } else {
          res.status(404).json({ message: 'Store not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// UPDATE
router.put('/:id', async (req, res) => {
    try {
        const [numAffectedRows] = await Store.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (numAffectedRows > 0) {
            res.json({ message: 'Update successful' });
        } else {
            res.status(404).json({ message: 'Store not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
    try {
        const numAffectedRows = await Store.destroy({
            where: {
                id: req.params.id
            }
        });

        if (numAffectedRows > 0) {
            res.json({ message: 'Delete successful' });
        } else {
            res.status(404).json({ message: 'Store not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
