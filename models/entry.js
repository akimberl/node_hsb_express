const mongoose = require('mongoose');

const EntrySchema = mongoose.Schema({
  img: {
    type: String,
  },
  content: {
    type: String,
  },
  author: {
    type: mongoose.ObjectId,
  },
  likes: [{
    type: mongoose.ObjectId,
    ref: 'User',
  }],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  modifiedAt: {
    type: Date,
    default: new Date(),
  },
});

/* EntrySchema.statics.RecentModified = function () {
  const array = this.find({ $query: {}, $orderby: { modifiedAt: -1 } });
  if (array) {
    console.log(array, '<<<< ARRAY');
    return array.splice(0, 3);
  }
  return array;
}; */

module.exports = mongoose.model('Entry', EntrySchema);
