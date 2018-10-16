// not sure what exactly it is??????????/
require("dotenv").config();

// get spotify keys from keys.js
var keys = require("./keys");
// get node spotify package
var Spotify = require("node-spotify-api");
// pass the object into node spotify package
var spotify = new Spotify(keys.spotify);

// get moment package
var moment = require("moment");

// get user command
var command = process.argv[2];
// get user input content
var userinputArr = [];
for(var i = 3; i < process.argv.length; i++) {
    userinputArr.push(process.argv[i]);
}

switch(command) {
    case "concert-this":
        // find the artist event
        // should return info: name of the venue, venue location,
        // date of the event

        // condense user inputs
        var usrinput = userinputArr.join(" ");
        // make query
        var queryUrl = "https://rest.bandsintown.com/artists/" + usrinput + "/events?app_id=11d1a33c27c585f40635f47adaf16f47";
        var request = require("request");
        request(queryUrl, function(err, response, body) {
            if (!err && response.statusCode === 200) {
                for(var i = 0; i < JSON.parse(body).length; i++) {
                    // get the datetime and convert using moment JS
                    var datetime = JSON.parse(body)[i].datetime;
                    var convertDate = moment(datetime, moment.ISO_8601);
                    var converted = convertDate.format("MM/DD/YYYY ddd HH:mm")


                    // REPORT: console.log everything
                    console.log("\n-------------------\n");
                    console.log("The name of the venue for " + usrinput + " is " + JSON.parse(body)[i].venue.name + ".");
                    console.log("The location of the venue is " + JSON.parse(body)[i].venue.city + ", " + JSON.parse(body)[i].venue.country + ".");
                    console.log("The date of the event at this location is " + converted + ".");
                }
            }
        })

        break;

    case "spotify-this-song":
        // something


        break;

    case "movie-this":
        // something
        break;
    
    case "do-what-it-says":
        // something
        break;
}