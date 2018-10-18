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
        // condense user inputs
        var usrinput = userinputArr.join("+");
        // get node spotify package
        var Spotify = require("node-spotify-api");
        // get spotify keys from keys.js
        var spotifyKeys = require("./keys");
        // pass the object into node spotify package
        var spotify = new Spotify(spotifyKeys);

        if(usrinput !== "") {
            spotify
                .search({type:'track', query: usrinput})
                .then(function(response) {
                    for(var i = 0; i < response.tracks.items.length; i++) {
                        console.log("\n--------- Here are searching results --------\n");
                        console.log("Song name: " + response.tracks.items[i].name);
                        console.log("Artist: " + response.tracks.items[i].artists[0].name);
                        console.log("Preview link: " + response.tracks.items[i].external_urls.spotify);
                        console.log("Album name: " + response.tracks.items[i].album.name);
                    }
                })
                .catch(function(err) {
                    console.log("\n---------- Error ----------\n");
                    console.log("Error: " + err);
                });
        }

        else {
            spotify
                .search({type:'track', query: 'The Sign'})
                .then(function(response) {
                    for(var i = 0; i < response.tracks.items.length; i++) {
                        if(response.tracks.items[i].artists[0].name === "Ace of Base") {
                            console.log("Song name: " + response.tracks.items[i].name);
                            console.log("Artist: " + response.tracks.items[i].artists[0].name);
                            console.log("Preview link: " + response.tracks.items[i].external_urls.spotify);
                            console.log("Album name: " + response.tracks.items[i].album.name);
                        }

                    }
                })
        }


        break;

    case "movie-this":
        // condense user inputs
        var usrinput = userinputArr.join(" ");

        if(usrinput !== "") {
            // make request
            var request = require("request");
            // make query
            var queryUrl = "http://www.omdbapi.com/?t=" + usrinput + "&apikey=trilogy";

            request(queryUrl, function(err, response, body) {

                var title = JSON.parse(body).Title;
                var year = JSON.parse(body).Year;
                var imdbRating = JSON.parse(body).imdbRating;
                var rotten = JSON.parse(body).Ratings[1].Value;
                var country = JSON.parse(body).Country;
                var language = JSON.parse(body).Language;
                var plot = JSON.parse(body).Plot;
                var actors = JSON.parse(body).Actors;

                if(!err && response.statusCode === 200) {
                    console.log("\n-------------------\n");
                    console.log("Title: " + title);
                    console.log("Year came out: " + year);
                    console.log("imdb Rating: " + imdbRating);
                    console.log("Rotten tomatoes Rating: " + rotten);
                    console.log("Country: " + country);
                    console.log("Language: " + language);
                    console.log("Plot: \n" + plot);
                    console.log("Actors: \n" + actors);
                }
            })
        }
        else {
            console.log("\n------------\n");
            console.log("If you haven't watched 'Mr.Nobody', then you should: http://www.imdb.com/title/tt0485947/");
            console.log("It's on Netflix!");

            // make request
            var request = require("request");
            // make query
            var errQueryUrl = "http://www.omdbapi.com/?t=Mr.+Nobody&apikey=trilogy";

            request(errQueryUrl, function(err, response, body) {

                var title = JSON.parse(body).Title;
                var year = JSON.parse(body).Year;
                var imdbRating = JSON.parse(body).imdbRating;
                var rotten = JSON.parse(body).Ratings[1].Value;
                var country = JSON.parse(body).Country;
                var language = JSON.parse(body).Language;
                var plot = JSON.parse(body).Plot;
                var actors = JSON.parse(body).Actors;

                if(!err && response.statusCode === 200) {
                    console.log("\n-------------------\n");
                    console.log("Title: " + title);
                    console.log("Year came out: " + year);
                    console.log("imdb Rating: " + imdbRating);
                    console.log("Rotten tomatoes Rating: " + rotten);
                    console.log("Country: " + country);
                    console.log("Language: " + language);
                    console.log("Plot: \n" + plot);
                    console.log("Actors: \n" + actors);
                }
            })
        }

        break;
    
    case "do-what-it-says":
        // something
        break;
}