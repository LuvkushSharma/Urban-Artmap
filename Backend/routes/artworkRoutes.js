const express = require("express");
const path = require("path");

const authController = require(path.join(
  __dirname,
  "../controllers/authController"
));

const artworkController = require(path.join(
  __dirname,
  "../controllers/artworkController"
));

const router = express.Router();

// Route to get top voted artworks
router.route("/top-voted").get(artworkController.getTopVotedArtworks);
router.route("/artist/:id").get(artworkController.getArtistByArtworkId);



router.route("/").post(authController.protect, authController.restrictTo('artist') , artworkController.createArtwork).get(artworkController.getArtworks);
router.route('/:id').get(artworkController.getArtworkById);
router.route("/:id/vote").get(authController.protect , authController.voteArtwork);


module.exports = router;
