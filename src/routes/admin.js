const express = require('express');
const router = express.Router();
const { Admin } = require('../../models');

router.post('/signup', async (req, res) => {
  const { email, password, nickname } = req.body;
  
  try {
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(409).json({ error: 'Admin already exists' });
    }
    const newAdmin = await Admin.create({
      email,
      password,
      nickname
    });

    return res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
