var twitter = require('ntwitter'),
    url = require('url');

var handleRequest = function(req, res) {

  var twit = new twitter({
      consumer_key: 'lgqxj6MJ66FioUxtEgal9g',
      consumer_secret: '19ExG6Hpx5wYNFZrTJCQrksgBrwaoL5pT5U20WfOZo',
      access_token_key: '19172093-U4mN7t2pdcccs69vEAxjzWHTYeFJjXKqEYJsoMCw',
      access_token_secret: 'uPNVKfT67DpMbWd9Bpw4LVDVzueYWykwlZwxDqkFp34'
  });

  if(req.method === "GET" && url.parse(req.url)) {
    console.log('url:', url.parse(req.url).pathname);
    var stockHashes = '$' + url.parse(req.url).pathname.toString().substr(1) + ' OR #' + url.parse(req.url).pathname.toString().substr(1);
    console.log('stockHashes:', stockHashes);
    twit.search(stockHashes, {}, function(err, data) {
      console.log(data.results[0].id, data.results[0].text, data.results[0].created_at);
      return data;
    });
  } else {
    return;
  }

};

exports.handleRequest = handleRequest;