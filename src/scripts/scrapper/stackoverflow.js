var $ = require('../vendor/jquery.min');
var ext = require('../utils/ext');

var scrapfyLogo = ext.extension.getURL('icons/icon-19.png');
var btnHtml = '<a href="https://scrapfy.io" class="scrapfy-link" target="_blank" title="Open in SCRAPfy"><img src="' + scrapfyLogo + '"></a>';

// Helpers
var addLink = function () {
  $('.scrapfy-link').remove();
  $('pre').prepend(btnHtml);

  $('.scrapfy-link').on('click', function (e) {
    e.preventDefault();
    var $this = $(this);

    var $code = $this.parent().find('code');
    var content = '';

    if ($code.length > 0) {
      content = $code.text()
    } else {
      var $parent = $this.parent();
      $parent.find('a.scrapfy-link').remove();
      content = $parent.text();
    }

    $this.text('loading...');

    $.ajax({
      type: 'POST',
      url: 'https://api.scrapfy.io/scraps',
      contentType: 'application/json',
      data: JSON.stringify({ content: content }),
      dataType: 'json'
    })
    .done(function (reponseData) {
      $this.html(btnHtml);

      if(!reponseData.url) {
        alert('SCRAPfy error: bad response format by the server');
        return false;
      }

      // Open the room in new tab
      window.open(reponseData.url);
    })
    .fail(function () {
      $this.html(btnHtml);
      alert('SCRAPfy error: seems the server is unreachable for the moment');
    });
  });
};

// Init
$(document).on('ready', function () {
  if (document.readyState === 'complete') {
    addLink();
  } else {
    document.onreadystatechange = function () {
      if (document.readyState === 'complete') {
        addLink();
      }
    };
  }
});