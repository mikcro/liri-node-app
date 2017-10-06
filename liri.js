var keys = require("./keys.js");
var Twitter = require('twitter');
var spotifyNode = require('spotify').spotifyNode;
var request = require('request');

// TWITTER//
var client = new Twitter(keys.twitterKeys);

var params = { screen_name: 'CroMikeDonMan' };
client.get('statuses/user_timeline', params, function (error, tweets, response) {

    if (error) {
        return console.log("liri doesn't understand that commands");
    }

    if (!error) {
        for (var i = 0; i < tweets.length; i<21) {
            var date = tweets[i].created_at
            var texts = tweets[i].text
        }
    }

    if (process.argv[2] == "my-tweets") {
        console.log(date, texts)
    }


});


if(process.argv[2] == 'movie-this'){
    movie(process.argv[3]);
} else if (process.argv[2] == 'spotify-this-song'){
    musicFm(process.argv[3]);
}

// SPOTIFY//


function spotify(song) {
var spotify = new spotify(keys.spotifyKeys);
    spotify.request("track.search", {
        track: song, handlers: {
            success: function (json) {

                if (process.argv[2] == "spotify-this-song") {
                    
                    //   console.log(JSON.stringify(json, null, 2) + " LOL" )
                    for (var i = 0; i < json.results.trackmatches.track.length; i++) {
                    //   console.log(JSON.stringify(json, null, 2));
                    console.log("Name: " + json.results.trackmatches.track[i].name)
                    console.log("----------------------")
                    console.log("Artist: " + json.results.trackmatches.track[i].artist)
                    console.log("----------------------")
                    console.log("Link: " + json.results.trackmatches.track[i].url)

                    }

                }


            },
            error: function (error) {
                console.log("The Sign" + error.message);
            }

        }
    });
}

//MOVIE THIS//


function movie(movieName) {
    
    
    request('http://www.omdbapi.com/?t=' +movieName + '&y=&plot=short&apikey=40e9cece', function (error, response, body) {
        // console.log('error:', error); 
        // console.log('statusCode:', response && response.statusCode); 
        // console.log('body:', body); 

        if(!error && response.statusCode == 200) {

            var data = JSON.parse(body);

            console.log("Title: " + data.Title);
            console.log("Year: " + data.Year);
            console.log("Rated: " + data.Rated);
            console.log("Country: " + data.Country);
            console.log("Actors: " + data.Actors);
            console.log("Language: " + data.Language);
            console.log("Plot: " + data.Plot);
        }
    })

};









