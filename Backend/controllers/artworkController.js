const Artwork = require('../models/Artwork');

const createArtwork = async (req, res) => {
  try {
    const { title, description, artist, date, story, imageUrl, location } = req.body;

    const newArtwork = new Artwork({
      title,
      description,
      artist,
      date,
      story,
      imageUrl,
      location,
    });

    const savedArtwork = await newArtwork.save();
    res.status(201).json(savedArtwork);
  } catch (error) {
    res.status(400).json({ message: 'Failed to create artwork', error });
  }
};

const getArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find();
    res.status(200).json(artworks);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch artworks', error });
  }
};


const getArtworkById = async (req, res) => {
  try {
    // Find artwork by ID where artist matches the provided artist ID
    const artworks = await Artwork.find({ artist: req.params.id });

    if (!artworks || artworks.length === 0) {
      return res.status(404).json({ message: 'No artworks found for this artist' });
    }

    res.status(200).json(artworks);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch artworks', error });
  }
};


const getArtistByArtworkId = async (req, res) => {

  try {
    const artwork = await Artwork.findById(req.params.id).populate('artist');

    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    res.status(200).json(artwork.artist);
  }
  catch (error) {
    res.status(400).json({ message: 'Failed to fetch artist', error });
  }
}


module.exports = {
  createArtwork,
  getArtworks,
  getArtworkById,
  getArtistByArtworkId
};

