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
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }
    res.status(200).json(artwork);
  } catch (error) {
    res.status(400).json({ message: 'Failed to fetch artwork', error });
  }
};

const voteArtwork = async (req, res) => {
  try {
    const artworkId = req.params.id;

    // Find artwork by ID and update votes
    const artwork = await Artwork.findByIdAndUpdate(
      artworkId,
      { $inc: { votes: 1 } }, // Increment votes by 1
      { new: true } // Return updated artwork
    );

    if (!artwork) {
      return res.status(404).json({ message: "Artwork not found" });
    }

    res.status(200).json(artwork);
  } catch (error) {
    res.status(400).json({ message: "Failed to vote for artwork", error });
  }
};



module.exports = {
  createArtwork,
  getArtworks,
  getArtworkById,
  voteArtwork,
 
};

