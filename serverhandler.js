var twitter = require('ntwitter'),
    url = require('url');

var handleRequest = function(req, res) {

  var twit = function() {
    return new twitter({
      consumer_key: 'lgqxj6MJ66FioUxtEgal9g',
      consumer_secret: '19ExG6Hpx5wYNFZrTJCQrksgBrwaoL5pT5U20WfOZo',
      access_token_key: '19172093-U4mN7t2pdcccs69vEAxjzWHTYeFJjXKqEYJsoMCw',
      access_token_secret: 'uPNVKfT67DpMbWd9Bpw4LVDVzueYWykwlZwxDqkFp34'
    });
  };

  twit.verifyCredentials(function (err, data) {
    console.log("Verifying Credentials...");
    if(err)
      console.log("Verification failed : " + err);
  });

  twit.search("$AAPL", {}, function(err, data) {
      console.log(data.results[0].id, data.results[0].text, data.results[0].created_at);
      return data;
  });

};

exports.handleRequest = handleRequest;