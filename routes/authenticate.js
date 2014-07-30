var express = require('express');
var request = require('request'); // Request Library
var querystring = require('querystring');
var router = express.Router();
var passport = require('passport');
var SpotifyStrategy = require('../node_modules/passport-spotify/lib/passport-spotify/index').Strategy;

var client_id='5373164c23cf4a498745319e03b75acf';
var client_secret='65ae7bb5ef0645d7b2159669701fd7e8';
var redirect_uri='http://localhost:3000/callback';
var scopes = 'user-read-private user-read-email';

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
})

passport.use(new SpotifyStrategy({
  clientID: client_id,
  clientSecret: client_secret,
  callbackURL: redirect_uri
},
function(accessToken, refreshToken, profile, done) {
  process.nextTick(function(){
    return done(null, profile);
  });
}));

router.get('/auth/spotify',
  passport.authenticate('spotify', {scope: 'user-read-email'}),
  function(req, res){
// The request will be redirected to spotify for authentication, so this
// function will not be called.
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});
