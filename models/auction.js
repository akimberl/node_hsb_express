const mongoose = require('mongoose');

const AuctionSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    default: 'this should be name'
  },
  author: {
    type: mongoose.ObjectId,
    ref: 'User',
  },
  conditon: {
    type: String,
  },
  startsAt: {
    type: String,
    require: true,
    default: 'today',
  },
  endsAt: {
    type: String,
    require: true,
    default: 'tommorow',
  },
  description: {
    type: String,
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

module.exports = mongoose.model('Auction', AuctionSchema);
