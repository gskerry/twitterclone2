
module.exports = function (io) {

var express = require('express');
var router = express.Router();

var tweetBank = require('../tweetBank');


router.get('/', function(req, res){
	var tweets = tweetBank.list();
	res.render('index', {title: 'Twitter,js', tweets: tweets, showForm: true} );
})
 
router.get('/users/:name', function(req, res) {
  var name = req.params.name;
  var list = tweetBank.find( {name: name} );
  res.render( 'index', { title: 'Twitter.js - Posts by '+name, tweets: list, showForm: true, fName: name} );
});


router.get('/users/:name/tweets/:id', function(req, res) {
  var name = req.params.name;
  var id = req.params.id;
  var list = tweetBank.find( {id: Number(id)} );
  res.render( 'index', { title: name+', Post#: '+id, tweets: list } );
});


router.post('/submit', function(req, res) {
  var name = req.body.name;
  var text = req.body.text;
  
  tweetBank.add(name, text);
  
  // var all_tweets = tweetBank.list()
  // var last_tweet = all_tweets[all_tweets.length-1];
  // io.sockets.emit('new_tweet', last_tweet);

  // io.sockets.emit('new_tweet', {name: name, text: text});

  // review... 
  res.redirect('/');
  
});

  return router;
};
