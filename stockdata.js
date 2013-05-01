var tweetCSS = {
  'font-size':'14px',
  'position':'absolute',
  'width':'400px',
  'background':'white',
  'color':'#000000',
  'border':'5px double rgba(135, 145, 180, 0.75)',
  'border-radius':'10px'
};

var stockdataCSS = {
  'padding':'5px 10px'
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

$(document).ready(function() {
  $('body').mouseup(function(e) {
    var selectedText = getSelectedText();
    $.ajax({
      url: 'http://download.finance.yahoo.com/d/quotes.csv?s=' + selectedText + '&f=n0l1p0&e=.csv',
      success: function(data)
      {
        var dataArray = data.split(',');
        var stockName = dataArray[0];
        var lastPrice = dataArray[1];
        var previousClose = dataArray[2];
        if(selectedText === '') {
          return;
        } else if(previousClose >= 0) {
          $('body').append(
          '<container class="popup">' +
            '<div class="stockdata"><strong>ID:</strong> ' + stockName + '</div>' +
            '<div class="stockdata"><strong>Current Price:</strong> $' + lastPrice + '</div>' +
            '<div class="stockdata" style="border-bottom:2px solid rgba(135, 145, 180, 0.75)"><strong>Prev Close:</strong> $' + previousClose + '</div>' +
          '</container>'
          );
          $('.popup').css(tweetCSS)
          .css('top', e.pageY)
          .css('left', e.pageX);
          $('.stockdata').css(stockdataCSS);
          $.ajax({
            url: 'http://127.0.0.1:8080/' + selectedText,
            error: function(){ console.log('Error'); },
            success: function(data)
            {
              data = $.parseJSON(data);
              console.log(data);
              var color;
              for(var i = 0; i < 5; i++){
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
    $('body').click(function() {
      $('container.popup').remove();
    });
  });
});
