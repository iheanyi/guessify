var express = require('express');
var router = express.Router();

var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
// var spotifyApi = new SpotifyWebApi({
//   clientId : 'fcecfc72172e4cd267473117a17cbd4d',
//     clientSecret : 'a6338157c9bb5ac9c71924cb2940e1a7',
//       redirectUri : 'http://www.example.com/callback'
//       });

/* GET home page. */
router.get('/', function(req, res) {
  res.render('playlist/index');
});


module.exports = router;
