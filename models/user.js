const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  name: {
    type: String,
  },
  password: {
    type: String,
    require: true,
  },
  likedEntries: [{
    type: mongoose.ObjectId,
    ref: 'Entry',
  }],
});

module.exports = mongoose.model('User', UserSchema);
