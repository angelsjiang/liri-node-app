console.log('this is loaded');

// process the "dotenv" package and extract info from .env file
require("dotenv").config();

var spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};

module.exports = spotify;