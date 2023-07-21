// routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Admin = require('../../models/admin');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ where: { email } });
    if (!admin) {
      return res.status(404).json({ error: 'Admin not found' });
    }

    const match = await bcrypt.compare(password, admin.password);
    if (!match) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET);
    return res.json({ token });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

module.exports = router;
