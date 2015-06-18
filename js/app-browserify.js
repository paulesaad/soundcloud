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

var tracks = new SC_Collection()
tracks.query = 'the beatles'
tracks.fetch()


// var matt_playlist = playlists/4759628


// class searchList extends React.Component {
//     constructor(){
//         super(props)
//     }

//     render(){

//     }
// }

class SC_Track extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            playing: false
        }
    }

    _toggle(e, data){
        this.setState({playing: !this.state.playing})
        if(this.state.playing) {
            this.state.sound.pause()
        } else {
            if(this.state.sound){
                this.state.sound.play();
            } else {
                SC.stream(`/tracks/${data.id}`, (sound) => {
                    sound.play();
                    this.setState({sound: sound})
                })
            }
        }
    }

    render(){
        console.log(this.state)
        var data = this.props.data,
            svgStyle = {
                color: '#000',
                enableBackground: 'accumulate'
            },
            defaultImage = 'http://cdn.shopify.com/s/files/1/0231/7685/t/3/assets/no-image-available.png',
            imgUrl = data.artwork_url ? data.artwork_url : defaultImage,
            artworkStyle = {
                margin: "auto",
                width: '49%',
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: "cover"
            },
            x = this.state.playing ? <svg onClick={(e)=>this._toggle(e, data)} className="playButton playing" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100"><path fill="#010101" d="M50,0.005c-0.432,0-0.858-0.011-1.287,0C21.695,0.689,0,22.821,0,50.002C0,77.615,22.386,100,50,100
                                s50-22.385,50-49.997C100,22.39,77.614,0.005,50,0.005z M50,90c-22.091,0-40-17.906-40-39.997c0-22.09,17.909-39.998,40-39.998
                                c22.092,0,40,17.908,40,39.998C90,72.093,72.092,90,50,90z"></path><polygon fill="#010101" points="35.857,79.41 76.824,50 35.647,20.59 "></polygon></svg> : <svg onClick={(e)=>this._toggle(e, data)} className="playButton" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100"><path fill="#010101" d="M50,0.005c-0.432,0-0.858-0.011-1.287,0C21.695,0.689,0,22.821,0,50.002C0,77.615,22.386,100,50,100
                                s50-22.385,50-49.997C100,22.39,77.614,0.005,50,0.005z M50,90c-22.091,0-40-17.906-40-39.997c0-22.09,17.909-39.998,40-39.998
                                c22.092,0,40,17.908,40,39.998C90,72.093,72.092,90,50,90z"></path><polygon fill="#010101" points="35.857,79.41 76.824,50 35.647,20.59 "></polygon></svg>

        return(
            <li className="track_listing">
                <div className="display">
                    <div className="song_components">
                        <div className="controller">
                            <div className="album_cover" style={artworkStyle}></div>  
                            {x}       
                        </div>
                        <div className="song_details">
                            <div className="title">
                                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100"><path fill-rule="evenodd" clip-rule="evenodd" d="M0.166,49.438C0.166,75.152,20.744,96,46.125,96  c12.096,0,23.1-4.731,31.306-12.469c2.144-2.021-8.776-12.227-10.269-10.84c-5.54,5.146-12.926,8.286-21.037,8.286  c-17.193,0-31.133-14.122-31.133-31.544s13.939-31.545,31.133-31.545c17.197,0,31.135,11.108,31.135,28.53  c0,0.007,0.021,0.062,0.049,0.069L75.778,48c-3.484,0-5.931,0-5.931,0l14.826,18.023L99.5,48c0,0-2.447,0-5.931,0l-1.531-1.514  c0.017-0.006,0.05-0.015,0.05-0.021c0-25.716-20.578-43.574-45.963-43.574C20.744,2.891,0.166,23.723,0.166,49.438z M78.743,44.933  l0.115,0.023l-0.089,0.086C78.754,44.977,78.743,44.933,78.743,44.933z"></path></svg>

                                <svg className="volume up" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(-291.45945,-564.08128)"><path style={svgStyle} d="m 364.56458,577.8629 a 3.5651488,3.5651488 0 0 0 -1.73288,6.6152 c 9.89607,6.13337 16.50367,17.07245 16.50367,29.59657 0,12.52417 -6.6076,23.46324 -16.50367,29.59658 a 3.5651488,3.5651488 0 1 0 3.76834,6.05134 c 11.92285,-7.3895 19.85941,-20.61515 19.85941,-35.64791 0,-15.03274 -7.93656,-28.25842 -19.85941,-35.64793 a 3.5651488,3.5651488 0 0 0 -2.03546,-0.56385 z m -24.21913,0.50884 -24.61797,17.63142 -13.93184,0 c -2.9606,0 -5.33619,2.3756 -5.33619,5.33618 l 0,25.47066 c 0,2.96063 2.37559,5.33619 5.33619,5.33619 l 13.93184,0 24.61797,17.63142 0,-71.40587 z m 15.60972,8.07307 a 3.5651488,3.5651488 0 0 0 -1.3753,6.79401 c 7.74095,3.7366 13.09291,11.62975 13.09291,20.83585 0,9.20614 -5.35196,17.0993 -13.09291,20.8359 a 3.5651488,3.5651488 0 1 0 3.10819,6.40893 c 10.1343,-4.89191 17.1088,-15.27232 17.1088,-27.24483 0,-11.97246 -6.9745,-22.35287 -17.1088,-27.24478 a 3.5651488,3.5651488 0 0 0 -1.73289,-0.38508 z m -9.10452,9.15953 a 3.5651488,3.5651488 0 0 0 -0.4401,7.09658 c 5.48425,0.89062 9.6684,5.59536 9.6684,11.37375 0,5.77844 -4.18415,10.48318 -9.6684,11.3738 a 3.5678542,3.5678542 0 1 0 1.15526,7.04157 c 8.87704,-1.44159 15.63722,-9.17362 15.63722,-18.41537 0,-9.2417 -6.76018,-16.97373 -15.63722,-18.41531 a 3.5651488,3.5651488 0 0 0 -0.71516,-0.055 z" fill="#000000" fillOpacity="1" fill-rule="nonzero" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"></path></g></svg>
                                <svg className="volume down hidden" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(-291.45945,-564.08128)"><path style={svgStyle} d="m 364.39849,577.73697 c -1.62581,0.0503 -3.12744,1.23901 -3.53963,2.8125 -0.41219,1.5735 0.30885,3.35727 1.70122,4.19817 l 0,-0.0137 c 9.80979,6.07989 16.35366,16.92966 16.35366,29.34604 0,12.41638 -6.54387,23.25243 -16.35366,29.33232 -0.86357,0.51314 -1.50473,1.38374 -1.74238,2.35975 -0.23764,0.97601 -0.0645,2.0284 0.46647,2.8811 0.531,0.8527 1.40645,1.47021 2.38719,1.6875 0.97654,0.21636 2.02768,0.0219 2.86738,-0.52134 0.003,-0.002 0.0105,0.002 0.0137,0 11.95106,-7.41142 19.90699,-20.66998 19.90699,-35.73931 0,-15.06933 -7.95593,-28.3416 -19.90701,-35.75305 -0.004,-0.002 -0.0101,0.002 -0.0137,0 -0.63583,-0.40537 -1.38649,-0.61292 -2.14025,-0.58994 z m 0,0.43903 c 0.66743,-0.0203 1.34521,0.16046 1.90702,0.52134 l 0.0137,0 c 11.83116,7.33269 19.70122,20.46381 19.70122,35.38262 0,14.91881 -7.87006,28.03621 -19.70122,35.3689 l -0.0137,0 c -0.73909,0.48188 -1.6767,0.65732 -2.53811,0.46647 l -0.0137,0 c -0.85655,-0.19338 -1.63489,-0.75004 -2.09907,-1.49543 -0.46639,-0.74895 -0.62031,-1.69458 -0.41158,-2.55183 0.20873,-0.85725 0.77809,-1.62093 1.53658,-2.07164 l 0,-0.0137 c 9.93409,-6.15692 16.57317,-17.13194 16.57317,-29.70274 0,-12.5708 -6.63908,-23.55954 -16.57317,-29.71646 -1.21294,-0.73255 -1.85449,-2.33354 -1.49542,-3.70427 0.35906,-1.37074 1.69802,-2.43944 3.11432,-2.48323 z m -24.16006,0.28811 -24.55792,17.58841 -13.89787,0 c -2.95338,0 -5.32317,2.36979 -5.32317,5.32317 l 0,25.40854 c 0,2.95338 2.36979,5.32317 5.32317,5.32317 l 13.89787,0 24.55792,17.58842 0,-71.23171 z m 15.55793,7.83384 c -1.69031,0.0622 -3.21776,1.36047 -3.55335,3.01829 -0.3356,1.65783 0.56604,3.45605 2.09908,4.17073 7.64876,3.69212 12.9375,11.49441 12.9375,20.59299 0,9.0943 -5.28084,16.88503 -12.92378,20.57927 -0.004,0.002 -0.0101,-0.002 -0.0137,0 l 0,0.0137 c -0.92921,0.40517 -1.6902,1.19017 -2.04421,2.14025 -0.35625,0.95608 -0.29431,2.04537 0.15092,2.96341 0.44523,0.91804 1.26492,1.63595 2.23628,1.94817 0.96716,0.31088 2.05518,0.20687 2.94969,-0.27439 0.004,-0.002 0.0101,0.002 0.0137,0 10.17771,-4.91784 17.17683,-15.34613 17.17683,-27.37043 0,-12.02855 -7.00699,-22.46847 -17.19055,-27.38414 l 0,0.0137 c -0.56528,-0.28734 -1.20463,-0.43247 -1.83841,-0.41159 z m 0.0274,0.43902 c 0.55867,-0.0184 1.12061,0.10342 1.6189,0.35671 10.03561,4.84427 16.9436,15.12823 16.9436,26.98628 0,11.85805 -6.90799,22.1283 -16.9436,26.97256 l 0,0.0137 -0.0137,0 c -0.7875,0.42739 -1.75369,0.52114 -2.60671,0.24696 -0.85301,-0.27419 -1.58462,-0.92247 -1.97561,-1.72866 -0.39098,-0.80619 -0.45004,-1.78083 -0.13719,-2.62043 0.31285,-0.8396 0.98777,-1.53952 1.81097,-1.89329 l 0.0137,-0.0137 c 7.79538,-3.7629 13.18445,-11.70841 13.18445,-20.97714 0,-9.26873 -5.38907,-17.22796 -13.18445,-20.99085 -1.33425,-0.62201 -2.15793,-2.23398 -1.86586,-3.67683 0.29208,-1.44285 1.68437,-2.62118 3.15549,-2.67531 z m -9.09604,8.91769 a 3.5564533,3.5564533 0 0 0 -0.43902,7.07927 c 5.47087,0.88844 9.64482,5.5817 9.64482,11.34603 0,5.76433 -4.17395,10.45759 -9.64482,11.34604 a 3.5591493,3.5591493 0 1 0 1.15244,7.02439 c 8.85539,-1.43808 15.59908,-9.15126 15.59908,-18.37043 0,-9.21917 -6.74369,-16.93235 -15.59908,-18.37043 a 3.5564533,3.5564533 0 0 0 -0.71342,-0.0549 z" fill="#000000" fillOpacity="1" fill-rule="nonzero" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"></path></g></svg>

                                <svg className="volume mute hidden" version="1.1" x="0px" y="0px" viewBox="0 0 100 100"><g transform="translate(-291.45945,-564.08128)"><path style={svgStyle} d="m 306.24148,574.33587 a 3.5564533,3.5564533 0 0 0 -2.46951,6.10519 l 14.0625,14.0625 -2.15396,1.53658 -13.89787,0 c -2.95338,0 -5.32317,2.36979 -5.32317,5.32317 l 0,25.40854 c 0,2.95338 2.36979,5.32317 5.32317,5.32317 l 13.89787,0 24.55792,17.58841 0,-32.77591 7.83384,7.83384 c -0.58836,0.1995 -1.19711,0.35083 -1.82469,0.45274 -0.97894,0.16061 -1.87715,0.71709 -2.45579,1.52287 -0.57865,0.80578 -0.81915,1.83356 -0.65854,2.8125 0.16061,0.97894 0.71709,1.89086 1.52287,2.46951 0.80578,0.57865 1.84727,0.81915 2.82622,0.65854 2.25303,-0.36588 4.36212,-1.14393 6.26981,-2.23628 l 2.92226,2.92225 c -0.74589,0.47406 -1.51744,0.91611 -2.3186,1.30336 -0.004,0.002 -0.0101,-0.002 -0.0137,0 l 0,0.0137 c -0.92921,0.40517 -1.6902,1.19017 -2.04421,2.14024 -0.35625,0.95609 -0.29431,2.04538 0.15092,2.96342 0.44523,0.91803 1.26492,1.63594 2.23628,1.94817 0.96716,0.31088 2.05518,0.20687 2.94969,-0.27439 0.004,-0.002 0.0101,0.002 0.0137,0 1.56619,-0.75678 3.05712,-1.65809 4.45885,-2.66159 l 2.93597,2.93598 c -0.79967,0.59691 -1.63226,1.16009 -2.48323,1.6875 -0.86357,0.51314 -1.50473,1.38375 -1.74238,2.35975 -0.23764,0.97601 -0.0645,2.0284 0.46647,2.8811 0.531,0.85271 1.40645,1.47022 2.38719,1.6875 0.97654,0.21636 2.02768,0.0219 2.86738,-0.52134 0.003,-0.002 0.0105,0.002 0.0137,0 1.34353,-0.83318 2.63198,-1.74122 3.8689,-2.71646 l 5.63872,5.63872 a 3.5564533,3.5564533 0 1 0 5.02132,-5.03509 l -5.47408,-5.47408 c 6.7377,-7.45893 10.85213,-17.33192 10.85213,-28.15244 0,-15.06933 -7.95593,-28.34161 -19.90701,-35.75305 -0.004,-0.002 -0.0101,0.002 -0.0137,0 -0.63583,-0.40537 -1.38649,-0.61292 -2.14025,-0.58994 -1.62159,0.0502 -3.1229,1.23134 -3.53963,2.79878 l 0,0.0137 c -0.41219,1.57349 0.30885,3.35727 1.70122,4.19817 l 0,-0.0137 c 9.80979,6.07989 16.35366,16.92965 16.35366,29.34604 0,8.76693 -3.27233,16.74228 -8.6433,22.81555 l -2.89481,-2.89482 c 4.64228,-5.34012 7.44969,-12.30717 7.44969,-19.92073 0,-12.02856 -7.00699,-22.46847 -17.19055,-27.38415 l 0,0.0137 c -0.56528,-0.28735 -1.20463,-0.43247 -1.83841,-0.41158 -1.69031,0.0622 -3.21776,1.36046 -3.55336,3.01829 -0.33559,1.65782 0.56604,3.45604 2.09909,4.17073 7.64875,3.69211 12.9375,11.4944 12.9375,20.59299 0,5.55762 -1.97636,10.62356 -5.25457,14.57012 l -2.85366,-2.85366 c 2.56532,-3.22361 4.08841,-7.29601 4.08841,-11.71646 0,-9.32622 -6.81686,-17.13478 -15.77744,-18.58994 -0.24972,-0.0448 -0.50094,-0.061 -0.75457,-0.0549 -1.89856,0.0249 -3.60046,1.64455 -3.71799,3.53963 -0.11725,1.8907 1.36305,3.71272 3.23781,3.97866 0.004,4.4e-4 0.009,-4.4e-4 0.0137,0 5.36103,0.87711 9.45274,5.47285 9.45274,11.12653 0,2.36043 -0.71332,4.52715 -1.93445,6.32469 l -13.54116,-13.54116 0,-28.39939 -16.54573,11.85366 -14.89939,-14.89939 a 3.5564533,3.5564533 0 0 0 -2.55183,-1.07012 z m 58.15701,3.82775 c 0.66743,-0.0203 1.34521,0.16046 1.90702,0.52134 l 0.0137,0 c 11.83116,7.33268 19.70122,20.4638 19.70122,35.38262 0,10.70521 -4.05463,20.47221 -10.71494,27.85061 l -4.73326,-4.73323 c 5.45547,-6.15355 8.78049,-14.22968 8.78049,-23.11738 0,-12.5708 -6.63908,-23.55954 -16.57317,-29.71646 -1.21294,-0.73255 -1.85449,-2.33354 -1.49542,-3.70427 0.35906,-1.37074 1.69802,-2.43944 3.11432,-2.48323 z m -8.57469,8.56097 c 0.55867,-0.0184 1.12061,0.10342 1.6189,0.35671 10.03561,4.84426 16.9436,15.12822 16.9436,26.98628 0,7.4945 -2.76186,14.34815 -7.32622,19.60518 l -4.71951,-4.71951 c 3.35742,-4.02703 5.37805,-9.2092 5.37805,-14.88567 0,-9.26873 -5.38907,-17.22796 -13.18445,-20.99086 -1.33425,-0.62201 -2.15793,-2.23398 -1.86586,-3.67683 0.29208,-1.44285 1.68437,-2.62118 3.15549,-2.6753 z m -9.09604,9.1372 c 0.22405,-0.005 0.45167,0.0153 0.67226,0.0549 8.75021,1.42099 15.42073,9.03878 15.42073,18.15091 0,4.29603 -1.48062,8.26199 -3.96494,11.40091 l -4.76067,-4.76067 c 1.2943,-1.88205 2.05793,-4.16228 2.05793,-6.64024 0,-5.8703 -4.249,-10.66033 -9.82317,-11.56555 l -0.0137,0 c -1.63213,-0.22504 -2.96936,-1.86778 -2.86738,-3.5122 0.10198,-1.64441 1.63153,-3.10639 3.27896,-3.12805 z m 1.6875,29.22256 5.02134,5.02134 c -1.83788,1.0357 -3.876,1.76194 -6.03658,2.1128 -0.86004,0.14111 -1.77532,-0.0679 -2.48323,-0.57622 -0.70792,-0.50836 -1.20341,-1.32136 -1.34452,-2.1814 -0.1411,-0.86004 0.0679,-1.77532 0.57622,-2.48323 0.50837,-0.70791 1.32137,-1.20341 2.18141,-1.34451 0.72126,-0.11713 1.41481,-0.30764 2.08536,-0.54878 z m 8.5747,8.57469 4.80183,4.80183 c -1.36849,0.97445 -2.82256,1.8424 -4.34909,2.57927 l 0,0.0137 -0.0137,0 c -0.7875,0.42739 -1.75369,0.52114 -2.60671,0.24695 -0.85301,-0.27418 -1.58462,-0.92247 -1.97561,-1.72866 -0.39098,-0.80618 -0.45004,-1.78082 -0.13719,-2.62042 0.31285,-0.83961 0.98777,-1.53952 1.81097,-1.89329 l 0.0137,-0.0137 c 0.85087,-0.41072 1.66613,-0.879 2.45579,-1.38567 z m 8.35518,8.35519 4.76067,4.76067 c -1.21157,0.95228 -2.47181,1.84671 -3.78658,2.66158 l -0.0138,0 c -0.73908,0.48188 -1.6767,0.65731 -2.53811,0.46647 l -0.0137,0 c -0.85652,-0.19338 -1.63486,-0.75004 -2.09904,-1.49543 -0.46639,-0.74895 -0.62031,-1.69458 -0.41158,-2.55183 0.20873,-0.85725 0.77809,-1.62094 1.53658,-2.07165 l 0,-0.0137 c 0.88165,-0.54643 1.73814,-1.13602 2.56555,-1.7561 z" fill="#000000" fillOpacity="1" fill-rule="nonzero" stroke="none" marker="none" visibility="visible" display="inline" overflow="visible"></path></g></svg>
                                <p>{data.title}</p>
                                <p>{data.user.username}</p>
                            </div>
                            <div className="completion">
                                <span>0:00</span>
                                <svg className="loading" xmlns="http://www.w3.org/2000/svg" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100"><g><path d="M59.402,24.168l6.729-18.486c-2.553-0.93-5.206-1.644-7.942-2.123l-3.416,19.379   C56.365,23.217,57.915,23.626,59.402,24.168z"></path><path d="M77.483,50L77.483,50c0,15.178-12.306,27.483-27.483,27.483c-15.179,0-27.483-12.306-27.483-27.483   c0-15.179,12.305-27.483,27.483-27.483V2.849C23.959,2.849,2.849,23.958,2.849,50c0,26.04,21.111,47.151,47.151,47.151   c26.04,0,47.151-21.111,47.151-47.151l0,0H77.483z"></path><path d="M67.663,28.95l12.645-15.068c-2.097-1.76-4.347-3.343-6.729-4.721L63.74,26.201C65.128,27.005,66.442,27.924,67.663,28.95z   "></path><path d="M77.063,45.228l19.379-3.417c-0.479-2.736-1.194-5.39-2.122-7.941l-18.487,6.728   C76.373,42.085,76.782,43.634,77.063,45.228z"></path><path d="M73.799,36.26l17.04-9.838c-1.379-2.383-2.961-4.633-4.721-6.729L71.05,32.337C72.076,33.558,72.994,34.871,73.799,36.26z"></path></g></svg>
                                <span className="hidden">3:30</span>
                            </div>
                        </div>
                    </div>
                    <div className="extras">
                        <div className="below_controller">
                            <div className="icon">
                                <svg viewBox="0 0 512 512"><path d="M443.5 273.1c0 25.1-20.4 45.5-45.5 45.5H271.5V162.3c4.8-1.8 9.9-3.1 15.1-3.9 4.1-0.6 8.3-1 12.5-1 42.3 0 77 32.7 80.3 74.1 5.7-2.5 11.9-4 18.6-4C423.1 227.6 443.5 248 443.5 273.1zM224.2 193.2v125.4h15.1v-134.5c-3.4 3.7-6.4 7.8-9 12.1C228.4 195 226.3 194.1 224.2 193.2zM247.6 318.6h15.1v-152.4c-5.4 2.7-10.5 6.1-15.1 9.9V318.6zM151.8 208.9v109.7h15.1V196.9C161.3 200.2 156.2 204.2 151.8 208.9zM106.5 231.6v86.5c1.9 0.2 3.7 0.4 5.7 0.4h7.9v-86.6c-2.6-0.5-5.2-0.7-7.9-0.7C110.3 231.3 108.4 231.4 106.5 231.6zM86.5 310.2c3.4 2.5 7.2 4.5 11.3 5.9v-82.4c-4.1 1.4-7.9 3.4-11.3 5.9V310.2zM128.4 234.4v84.2h15.1v-98.7c-3.4 5.6-6 11.8-7.5 18.4C133.6 236.8 131.1 235.5 128.4 234.4zM175.9 318.6h15.1V188.8c-5.3 0.7-10.3 2-15.1 3.8V318.6zM200.1 318.6h15.1v-128.3c-4.8-1.2-9.9-1.9-15.1-1.9V318.6L200.1 318.6zM79.1 303.4v-56.9c-6.6 7.6-10.6 17.6-10.6 28.5C68.5 285.8 72.5 295.7 79.1 303.4z"/></svg>
                            </div>
                            <div className="buy">
                                <span>BUY</span>
                            </div>
                        </div>

                        <div className="below_song_details">
                            <div className="times_played">

                                <div>
                                    <svg version="1.1" x="0px" y="0px" viewBox="0 0 100 100" style={svgStyle}><path d="M50,0C22.388,0,0,22.388,0,50s22.388,50,50,50s50-22.388,50-50S77.612,0,50,0z M31.25,75V25  l50.024,25L31.25,75z" fill="#010101"></path></svg>
                                    <span>{data.playback_count}</span>
                                </div>
                            </div>
                            <div className="loves">
                                <div>
                                    <svg version="1.1" x="0px" y="0px" viewBox="-12.058 0.441 100 87.501" enable-background="new -12.058 0.441 100 87.501">
                                    <path d="M0.441,50.606c-8.714-8.552-12.499-17.927-12.499-26.316c0-14.308,9.541-23.849,24.011-23.849
                                    c13.484,0,18.096,6.252,25.989,15.297C45.836,6.693,50.44,0.441,63.925,0.441c14.477,0,24.018,9.541,24.018,23.849
                                    c0,8.389-3.784,17.765-12.498,26.316L37.942,87.942L0.441,50.606z"></path></svg>
                                    <span>{data.likes_count}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
}

class App extends React.Component {
    constructor(props){
        super(props)
        this.props.collection.on('sync', () => this.forceUpdate())
    }

    render(){
        var list = this.props.collection.toJSON()
        console.log(list)
        return (
            <div>
                <div className="toolbar">
                    <svg className="scSvg" viewBox="0 0 512 512"><path d="M443.5 273.1c0 25.1-20.4 45.5-45.5 45.5H271.5V162.3c4.8-1.8 9.9-3.1 15.1-3.9 4.1-0.6 8.3-1 12.5-1 42.3 0 77 32.7 80.3 74.1 5.7-2.5 11.9-4 18.6-4C423.1 227.6 443.5 248 443.5 273.1zM224.2 193.2v125.4h15.1v-134.5c-3.4 3.7-6.4 7.8-9 12.1C228.4 195 226.3 194.1 224.2 193.2zM247.6 318.6h15.1v-152.4c-5.4 2.7-10.5 6.1-15.1 9.9V318.6zM151.8 208.9v109.7h15.1V196.9C161.3 200.2 156.2 204.2 151.8 208.9zM106.5 231.6v86.5c1.9 0.2 3.7 0.4 5.7 0.4h7.9v-86.6c-2.6-0.5-5.2-0.7-7.9-0.7C110.3 231.3 108.4 231.4 106.5 231.6zM86.5 310.2c3.4 2.5 7.2 4.5 11.3 5.9v-82.4c-4.1 1.4-7.9 3.4-11.3 5.9V310.2zM128.4 234.4v84.2h15.1v-98.7c-3.4 5.6-6 11.8-7.5 18.4C133.6 236.8 131.1 235.5 128.4 234.4zM175.9 318.6h15.1V188.8c-5.3 0.7-10.3 2-15.1 3.8V318.6zM200.1 318.6h15.1v-128.3c-4.8-1.2-9.9-1.9-15.1-1.9V318.6L200.1 318.6zM79.1 303.4v-56.9c-6.6 7.6-10.6 17.6-10.6 28.5C68.5 285.8 72.5 295.7 79.1 303.4z"/></svg>
                    <form>
                        <label htmlFor="search_soundcloud">Search SoundCloud</label>
                        <input ref="search" type="text" name="search_soundcloud" />
                    </form>
                </div>

                <ul>
                    {list.map((song) => <SC_Track data={song} />)}
                </ul>

            </div>
        )
    }
}


// var SoundcloudRouter = Backbone.Router.extend({
//     routes: {

//     }
// })








React.render(<App collection={tracks} />, document.querySelector('.container'))

