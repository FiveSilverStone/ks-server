// routes/admin.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const { Admin } = require('../../models');

router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(409).json({ error: 'Admin already exists' });
    }
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = await Admin.create({
      email,
      password: hashedPassword
    });

    return res.status(201).json({ message: 'Admin created successfully', admin: newAdmin });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
