const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  displayName: String,
  email: String,
  password: String // si el usuario decide agregarla después
});

module.exports = mongoose.model('User', userSchema);
