
var _ = require('underscore');
var User = require('./models').User;
var Tweet = require('./models').Tweet;


var data = [];
// var id = 1;

var initialize = function(name, text, id) {
  data.push({name: name, text: text, id: id});
};

var add = function (name, text) {
  var num;
  var id;
  User.findOrCreate({where:{name: name}}).complete(function(err, user) {
    // var thing = user[0].dataValues.id
    // console.log("thing: ",thing);
    // console.log("type: ", typeof thing);
    id = user[0].dataValues.id;
    num = parseInt(id);

    Tweet.create({UserId: num, tweet: text}).then(function(){
      // console.log("POSTED.")
      data.push({name: name, text: text, id: id});
      // Tweet.findAll().complete(function(err, tweets){
      //   console.log(tweets);
      // });

    }); // end create

  }); // end find callback
  
}; // close add method

var list = function () {
  return _.clone(data);
};

var find = function (properties) {
	console.log("TBprop:",properties)
  return _.where(data, properties);
};

module.exports = { initialize: initialize, add: add, list: list, find: find };


// SQL Example code
/*User.find(7).complete(function(err, user) {
    user.getTweets().complete(function(err, tweets) {
        console.log(tweets);
  })
});*/

// Test JOIN
/*Tweet.findAll({ include: [ User ] }).complete(function(err, tweets) {
        console.log(JSON.stringify(tweets[0]));
        // console.log(JSON.stringify(tweets[0].tweet));
        // console.log(JSON.stringify(tweets[0].User.name));
});*/


Tweet.findAll({ include: [ User ] }).complete(function(err, tweets) {
        // console.log(tweets);
        console.log("# of tweets:",tweets.length);
        
        for(var i=0; i<tweets.length; i++) {
          console.log("id: ",tweets[i].dataValues.id);
          // console.log("user: ",tweets[i].dataValues.UserId);
          console.log("user: ",tweets[i].dataValues.User.name);
          console.log(tweets[i].dataValues.tweet);

          var tweeter = tweets[i].dataValues.User.name
          var tweetie = tweets[i].dataValues.tweet
          var tweetdex = tweets[i].dataValues.id

          module.exports.initialize(tweeter, tweetie, tweetdex);

        }
});

// console.log(data);