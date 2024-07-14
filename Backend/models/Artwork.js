const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  story: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  votes: { type: Number, default: 0 }
});

const Artwork = mongoose.model('Artwork', artworkSchema);

module.exports = Artwork;
