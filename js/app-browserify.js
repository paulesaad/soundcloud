"use strict";

// es5 polyfills, powered by es5-shim
require("es5-shim")
    // es6 polyfills, powered by babel
require("babel/register")

var Promise = require('es6-promise').Promise,
    $ = require('jquery'),
    Backbone = require('backbone')

var sc_url = `https://api.soundcloud.com/oauth2/token`
    // artist_url = 


// Have search route to or from "search_soundcloud"
// Need to get the album art into the box, and then have it clickable, and have it play the track.


SC.initialize({
    client_id: '30dd685cbb8d8a53e9fbbec9825fd138'
});

$(document).ready(function() {
    SC.get('/tracks', {
        genres: '...'
    },
     function(tracks) {
        $(tracks).each(function(index, track) {
            $('#results').append($('<li></li>').html(track.title + ' - ' + track.genre));
            // $('#results').append($('<li></li>').html) // ${user} or something needs to be added
        });
        $('...').click(function(e) {
            e.preventDefault();
            sound.start();
        });
    });
});

/*
	Change #results to perhaps another phrase, unless results would be "likes", "durration", etc.
	Still need to test before confirming this.
/*

//HTML
       // <ul id="results">

       //  </ul>



// -----------------------------------------------------

SC.initialize({
  client_id: 'ff508288606264cb4f1469b5ba4f23e8'
}

client_secret: '11c8901be7ac78174059b4fb464c5072'



*/
