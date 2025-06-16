const express = require('express');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/User');

// Iniciar autenticación con Google
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Callback de Google
router.get(
'/google/callback',
passport.authenticate('google', { failureRedirect: '/auth/login/failed', session: false }),
async (req, res) => {
const { email } = req.user;


try {
  const user = await User.findOne({ email });
  if (!user) return res.redirect('http://localhost:5173?error=Usuario no encontrado');

  // Crear token JWT
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Guardar token en BD
  user.token = token;
  await user.save();

  // Redirigir al frontend con email y token
  res.redirect(
    `http://localhost:5173/google-password?email=${encodeURIComponent(email)}&token=${token}`
  );
} catch (error) {
  console.error(error);
  res.redirect('http://localhost:5173?error=Error en el servidor');
}
}
);

// Ruta para guardar contraseña
router.post('/set-password', async (req, res) => {
const { email, password } = req.body;

try {
const user = await User.findOne({ email });
if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });


user.password = password; // 🔐 IMPORTANTE: usa bcrypt en producción
await user.save();

res.status(200).json({ message: 'Contraseña guardada correctamente' });
} catch (error) {
res.status(500).json({ message: 'Error al guardar la contraseña' });
}
});

module.exports = router;