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
    var selectedNode = getSelectedNode();
    console.log(selectedText, selectedNode);
    $.ajax({
      url: 'http://download.finance.yahoo.com/d/quotes.csv?s=' + selectedText + '&f=n0l1p0&e=.csv',
      success: function(data)
      {
        var dataArray = data.split(',');
        var stockName = dataArray[0];
        var lastPrice = dataArray[1];
        var previousClose = dataArray[2];
        console.log(previousClose);
        if(previousClose >= 0) {
          $('body').append(
          '<container class="popup">' +
            '<div>ID: ' + stockName + '</div>' +
            '<div>Current Price: $' + lastPrice + '<div>' +
            '<div>Prev Close: $' + previousClose + '<div>' +
          '</container>'
          );
          $('.popup').css('top', e.pageY)
          .css('left', e.pageX)
          .css('position', 'absolute')
          .css('width', 'auto')
          .css('padding', '10px')
          .css('background', '#eeeeee')
          .css('color', '#000000')
          .css('border', '1px solid #1a1a1a')
          .css('font-size', '90%');
        } else {
          $('body').append(
          '<container class="popup" style="text-align:center">No Pricing Information Available</container>'
          );
          $('.popup').css('top', e.pageY)
          .css('left', e.pageX)
          .css('position', 'absolute')
          .css('width', '280px')
          .css('padding', '10px')
          .css('background', '#eeeeee')
          .css('color', '#000000')
          .css('border', '1px solid #1a1a1a')
          .css('font-size', '90%');
        }
      }
    });
    $.ajax({
      url: 'http://127.0.0.1:8080/' + selectedText,
      success: function(data)
      {
        console.log(data);
        // var dataArray = data.split(',');
        // var stockName = dataArray[0];
        // var lastPrice = dataArray[1];
        // var previousClose = dataArray[2];
        // console.log(previousClose);
        // if(previousClose >= 0) {
        //   $('body').append(
        //   '<container class="popup">' +
        //     '<div>ID: ' + stockName + '</div>' +
        //     '<div>Current Price: $' + lastPrice + '<div>' +
        //     '<div>Prev Close: $' + previousClose + '<div>' +
        //   '</container>'
        //   );
        //   $('.popup').css('top', e.pageY)
        //   .css('left', e.pageX)
        //   .css('position', 'absolute')
        //   .css('width', 'auto')
        //   .css('padding', '10px')
        //   .css('background', '#eeeeee')
        //   .css('color', '#000000')
        //   .css('border', '1px solid #1a1a1a')
        //   .css('font-size', '90%');
        // } else {
        //   $('body').append(
        //   '<container class="popup" style="text-align:center">No Pricing Information Available</container>'
        //   );
        //   $('.popup').css('top', e.pageY)
        //   .css('left', e.pageX)
        //   .css('position', 'absolute')
        //   .css('width', '280px')
        //   .css('padding', '10px')
        //   .css('background', '#eeeeee')
        //   .css('color', '#000000')
        //   .css('border', '1px solid #1a1a1a')
        //   .css('font-size', '90%');
        // }
      }
    });
    setTimeout(function() {
      $('.popup').remove();
    }, 5000);
  });
});
