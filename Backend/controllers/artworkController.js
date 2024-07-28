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

const getTopArtworks = async () => {

     try {

      const artworks = await Artwork.find({}, { voters: 0, __v: 0 , _id: 0});
      
      let topArtworks = {"1": [], "2": [], "3": []};
      const topVotes = new Set();
      
      for (let i = 0; i < artworks.length; i++) topVotes.add(artworks[i].votes);

      if (topVotes.size < 3) {
        return topArtworks;
      }

      // Sort topVotes set in descending order
      const sortedVotes = [...topVotes].sort((a, b) => b - a);

      const RANK_ONE_VOTES = sortedVotes[0];
      const RANK_TWO_VOTES = sortedVotes[1];
      const RANK_THREE_VOTES = sortedVotes[2];

      for (let i = 0; i < artworks.length; i++) {
        if (artworks[i].votes === RANK_ONE_VOTES) {
          topArtworks["1"].push(artworks[i]);
        } else if (artworks[i].votes === RANK_TWO_VOTES) {
          topArtworks["2"].push(artworks[i]);
        } else if (artworks[i].votes === RANK_THREE_VOTES) {
          topArtworks["3"].push(artworks[i]);
        }
      }

      return topArtworks;
    
     } catch (err) {

       console.log(err);
     }
};

// Get top voted artworks
const getTopVotedArtworks = async (req, res) => {
  try {

    const artworks = await getTopArtworks();
    res.json(artworks);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getArtworkDetails = async (req, res) => {
  try {
    const { locations } = req.body;

    // Find artworks matching the given locations
    const artworks = await Artwork.find({ title: { $in: locations } });

    if (!artworks || artworks.length === 0) {
      return res.status(404).json({ message: 'No artworks found' });
    }

    res.json(artworks);
  } catch (error) {
    console.error('Error fetching artwork details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  createArtwork,
  getArtworks,
  getArtworkById,
  getArtistByArtworkId,
  getTopVotedArtworks,
  getArtworkDetails

};

