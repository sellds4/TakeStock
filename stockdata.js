var tweetCSS = {
  'font-size':'14px',
  'position':'absolute',
  'width':'425px',
  'background':'#FFFDD0',
  'color':'#000000',
  'border':'5px double rgba(165, 10, 10, 0.75)',
  'border-radius':'10px',
  'text-align':'left',
  'z-index':9999
};

var noinfoCSS = {
  'text-align': 'center',
  'padding': '10px',
  'background-color': '#eeeeee',
  'width': '250px',
  'border': '1px solid black'
};

var stockdataCSS = {
  'padding':'10px 0 5px 0'
};

var getSelectedText = function() {
    var text = "";
    if (window.getSelection) {
        text = window.getSelection().toString();
    } else if (document.selection && document.selection.type != "Control") {
        text = document.selection.createRange().text;
    }
    return text;
};

var getSelectedNode = function() {
    if (document.selection)
      return document.selection.createRange().parentElement();
    else
    {
      var selection = window.getSelection();
      if (selection.rangeCount > 0)
        return selection.getRangeAt(0).startContainer.parentNode;
    }
};

var tweetGet = function(data, firstTweet, lastTweet) {
  var color;
  for(var i = firstTweet; i < lastTweet; i++){
    if(i % 2 === 0) {
      color = '#C3E1FF';
    } else {
      color = '#78B4EB';
    }
    $('.popup').append(
      '<container class="tweet">' +
        '<div class="tweettext" style="padding:5px 10px 7px 10px; font-style:italic; background-color:' + color + '"><strong>' + data[i].text + '</strong></div>' +
        '<div class="tweetuser" style="padding:0 0 2px 10px; font-size:12px;background-color:' + color + '">- ' + data[i].from_user + '</div>' +
        '<div class="tweetdate" style="padding:0 0 5px 10px; font-size:11px;background-color:' + color + '">' + data[i].created_at + '</div>' +
      '</container>'
    );
  }
  // $('.popup').append(
  //   '<div clas s="moretweets" style="padding:5px; text-align:right; background-color:#FFFDD0; border-top:2px solid rgba(165, 10, 10, 0.75)"><a href="#">More Tweets</a></div>'
  // );
};

//n=Name[0], s=symbol[1], l1=LastTrade[2], p=PreviousClose[3], o=Open[4], b=Bid[5], a=Ask[6], g=Day'sLow[7], h=Day'sHigh[8]

$(document).ready(function() {
  $('body').click(function(e) {
    var selectedText = getSelectedText();
    var firstTweetIndex = 0;
    var lastTweetIndex = 5;
    var mouseX = e.pageX;
    var mouseY = e.pageY;
    $.ajax({
      url: 'http://download.finance.yahoo.com/d/quotes.csv?s=' + selectedText + '&f=nsl1pobagh',
      success: function(data)
      {
        var dataArray = data.split(',');
        var stockName = dataArray[0];
        var stockSymbol = dataArray[1];
        var lastPrice = dataArray[2];
        var previousClose = dataArray[3];
        var openPrice = dataArray[4];
        var bid = dataArray[5];
        var ask = dataArray[6];
        var daysLow = dataArray[7];
        var daysHigh = dataArray[8];
        var priceColor;
        if(lastPrice > previousClose) {
          priceColor = 'green';
        } else if(lastPrice < previousClose) {
          priceColor = 'red';
        }
        if(selectedText === '') {
          return;
        } else if(previousClose >= 0) {
          $('body').append(
          '<container class="popup">' +
            '<div class="stockdata" style="color:blue; font-size:125%; text-align:center"><strong>' + stockName + ' (' + stockSymbol + ')</strong></div>' +
            '<div><table width=100%>' +
            '<tr><th>Current Price:</th><td style="color:' + priceColor + '">$' + lastPrice + '</td><th>Current Bid:</th><td>$' + bid + '</td></tr>' +
            '<tr><th>Today&#39s Open:</th><td>$' + openPrice + '</td><th>Current Ask:</th><td>$' + ask + '</td></tr>' +
            '<tr><th>Previous Close:</th><td>$' + previousClose + '</td><th>Day&#39s Range:</th><td>$' + daysLow + '-$' + daysHigh + '</td></tr>' +
            '</table></div>' +
            '<div class="stockgraph" style="border-bottom:2px solid rgba(165, 10, 10, 0.75); padding:10px 0 10px 35px"><img src="http://chart.finance.yahoo.com/z?s=' + selectedText + '&t=6m&q=l&l=on&z=s&p=m50,m200"></div>' +
          '</container>'
          );
          $('.popup').css(tweetCSS)
          .css('top', mouseY)
          .css('left', mouseX);
          $('.popup').find('th').css({'padding-left':'10px'});
          $('.stockdata').css(stockdataCSS);
          $.ajax({
            url: 'http://127.0.0.1:8080/' + selectedText,
            error: function(){ console.log('Error'); },
            success: function(data)
            {
              data = $.parseJSON(data);
              console.log(data);
              tweetGet(data, firstTweetIndex, lastTweetIndex);
            }
          });
        } else {
          $('body').append(
          '<container class="popup" style="text-align:center">No Pricing Information Available</container>'
          );
          $('.popup').css(tweetCSS)
          .css('top', e.pageY)
          .css('left', e.pageX)
          .css(noinfoCSS);
        }
      }
    });
    $('body').click(function() {
      $('.popup').remove();
      $('.moretweets').remove();
    });
    $('.moretweets').click(function(e) {
      console.log("More Tweets");
      e.preventDefault();
      e.stopImmediatePropagation();
      $('.tweet').remove();
      firstTweetIndex += 5;
      lastTweetIndex += 5;
      console.log(firstTweetIndex, lastTweetIndex);
      tweetGet(data, firstTweetIndex, lastTweetIndex);
    });
  });
});
