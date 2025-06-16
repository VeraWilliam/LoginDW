const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.generateToken = (user) => {
  return jwt.sign({ id: user._id, displayName: user.displayName, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

exports.setPassword = async (req, res) => {
  const { password } = req.body;
  const user = req.user;
  if (!user) return res.status(400).json({ message: 'Usuario no autenticado' });

  user.password = await bcrypt.hash(password, 10);
  await user.save();
  const token = exports.generateToken(user);
  res.json({ message: 'Contraseña guardada', token });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !user.password) return res.status(400).json({ message: 'No registrado o sin contraseña' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = exports.generateToken(user);
  res.json({ message: 'Inicio de sesión exitoso', token });
};
