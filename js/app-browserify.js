"use strict";

// es5 polyfills, powered by es5-shim
require("es5-shim")
    // es6 polyfills, powered by babel
require("babel/register")

var Promise = require('es6-promise').Promise,
    $ = require('jquery'),
    Backbone = require('backbone'),
    React = require('react'),
    sc_key = '5e3fe3759c70fe637cb15bab22e238e0',
    sc_url = `https://api.soundcloud.com/tracks?client_id=${sc_key}`


SC.initialize({
  client_id: 'ff508288606264cb4f1469b5ba4f23e8'
})

var SC_Collection = Backbone.Collection.extend({
    query: '',

    url: function(){
        return `${sc_url}&q=${this.query}`
    }
})

var collection = new SC_Collection()
collection.fetch().then(() => {
    console.log(collection.toJSON())
})


// var matt_playlist = playlists/4759628


// class SC_Item extends React.Component {
//     constructor(props){
//         super(props)
//     }

//     render(){
//         return(
//             <div>hi</div>
//         )
//     }
// }

// class searchList extends React.Component {
//     constructor(){
//         super(props)
//     }

//     render(){

//     }
// }

// class App extends React.Component {
//     constructor(){
//         super(props)
//     }

//     render(){

//     }
// }

// React.render(<SC_Item tracks={SC_Collection} />, document.querySelector('.container'))

