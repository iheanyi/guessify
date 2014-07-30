var express = require('express');
var request = require('request'); // Request Library
var querystring = require('querystring');
var router = express.Router();
var passport = require('passport');
var SpotifyStrategy = require('../node_modules/passport-spotify/lib/passport-spotify/index').Strategy;

var client_id='5373164c23cf4a498745319e03b75acf';
var client_secret='65ae7bb5ef0645d7b2159669701fd7e8';
var redirect_uri='http://localhost:3000/callback';
var scopes = 'user-read-private user-read-email user-library-read';
var SpotifyWebApi = require('spotify-web-api-node');
var spotifyApi = new SpotifyWebApi();


/** Generate random string containing numbers and letters
*  @param {number} Length The length of the string
*  @param {string} The generated string
*  As per the guidelines on Spotify's authentication demo.
*/
var generateRandomString = function(length) {
  var text='';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for(var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

var stateKey = 'spotify_auth_state';


var spotifyApi = new SpotifyWebApi({
  clientId : client_id,
  clientSecret : client_secret,
  redirectUri : redirect_uri
});

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Guessify' });
});

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
})

passport.use(new SpotifyStrategy({
  clientID: client_id,
  clientSecret: client_secret,
  callbackURL: redirect_uri,
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function(){
    console.log("Access token.");
    console.log(access_token);
    console.log(profile);
    return done(null, profile);
  });
}));

router.get('/auth/spotify',
  passport.authenticate('spotify', {scope: scopes}),
  function(req, res) {
// The request will be redirected to spotify for authentication, so this
// function will not be called.
});

router.get('/callback',
  passport.authenticate('spotify', { failureRedirect: '/login' }),
  function(req, res) {
    console.log("Entered callback.");
    res.redirect('/profile');
  });

router.get('/login', function(req, res){
  res.render('login', { user: req.user, title: 'Guessify'});
});


router.get('/profile', function(req,res) {
  console.log(req.user);
  console.log(req.access_token);
  spotifyApi.getUserPlaylists('req.user.id')
    .then(function(data) {
      console.log('Retrieved playlists', data);
      $("#playlist").innerHTML(data);
    },function(err) {
      console.log('Something went wrong!', err);
    });
  res.render('profile', { user: req.user, title: 'Guessify' });
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});


router.get('/hello', function(req, res) {
  return res.send("Hello World!");
});

module.exports = router;
