var tweetCSS = {
  'font-size':'14px',
  'position':'absolute',
  'width':'400px',
  'background':'white',
  'color':'#000000',
  'border':'5px double rgba(135, 145, 180, 0.75)',
  'border-radius':'10px',
  'text-align':'left'
};

var stockdataCSS = {
  'padding':'5px 10px',
  'text-align':'left'
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
      color = '#eeeeee';
    }
    $('.popup').append(
      '<container class="tweet">' +
        '<div class="tweettext" style="padding:5px 10px 7px 10px; font-style:italic; background-color:' + color + '"><strong>' + data[i].text + '</strong></div>' +
        '<div class="tweetuser" style="padding:0 0 2px 10px; font-size:12px;background-color:' + color + '">- ' + data[i].from_user + '</div>' +
        '<div class="tweetdate" style="padding:0 0 5px 10px; font-size:11px;background-color:' + color + '">' + data[i].created_at + '</div>' +
      '</container>'
    );
  }
  $('.popup').append(
    '<div class="moretweets" style="padding:5px; text-align:right; border-top:2px solid rgba(135, 145, 180, 0.75)"><a href="#">More Tweets</a></div>'
    );
};

$(document).ready(function() {
  $('body').mouseup(function(e) {
    var selectedText = getSelectedText();
    var firstTweetIndex = 0;
    var lastTweetIndex = 5;
    var mouseX = e.pageX;
    var mouseY = e.pageY;
    $.ajax({
      url: 'http://download.finance.yahoo.com/d/quotes.csv?s=' + selectedText + '&f=nl1p0&e=.csv',
      success: function(data)
      {
        var dataArray = data.split(',');
        var stockName = dataArray[0];
        var lastPrice = dataArray[1];
        var previousClose = dataArray[2];
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
            '<div class="stockdata"><strong>ID:</strong> ' + stockName + '</div>' +
            '<div class="stockdata"><strong>Current Price:</strong><var style="color:' + priceColor + '">$' + lastPrice + '</var></div>' +
            '<div class="stockdata" style="border-bottom:2px solid rgba(135, 145, 180, 0.75)"><strong>Prev Close:</strong> $' + previousClose + '</div>' +
          '</container>'
          );
          $('.popup').css(tweetCSS)
          .css('top', mouseY)
          .css('left', mouseX);
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
          .css('padding', '10px')
          .css('background-color', '#eeeeee')
          .css('width', '250px')
          .css('border', '1px solid black');
        }
      }
    });
    // $('.moretweets').click(function(e) {
    //   e.preventDefault();
    //   $('.tweet').remove();
    //   firstTweetIndex += 5;
    //   lastTweetIndex += 5;
    //   tweetGet(data, firstTweetIndex, lastTweetIndex);
    // });
    $('body').click(function() {
      $('.popup').remove();
      $('moretweets').remove();
    });
  });
});
