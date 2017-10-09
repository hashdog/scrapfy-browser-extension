var ext = require('./utils/ext');
var $ = require('./vendor/jquery.min');

// Copy the given string to the clipboard
function copyTextToClipboard(text) {
  var tmpCopyDom = $('<textarea/>');
  tmpCopyDom.text(text);
  $('body').append(tmpCopyDom);

  tmpCopyDom.select();
  document.execCommand('copy', true);

  tmpCopyDom.remove();
}

/**
 * Create a SCRAPfy room with content
 * @param string contentToSend
 */
function createSCRAPfyRoom(contentToSend) {
  $.ajax({
    type: 'POST',
    url: 'https://api.scrapfy.io/scraps',
    contentType: 'application/json',
    data: JSON.stringify({ content: contentToSend }),
    dataType: 'json'
  })
  .done(function (reponseData) {
    if (!reponseData.url) {
      alert('SCRAPfy error: bad response format by the server');
      return false;
    }

    // Copy the link into clipboard
    copyTextToClipboard(reponseData.url);

    // Open the room in new tab
    ext.tabs.create({
      url: reponseData.url
    });
  })
  .fail(function () {
    alert('SCRAPfy error: seems the server is unreachable for the moment');
  });
}

// Create SelectionContextMenu
ext.contextMenus.create({
  type: 'normal',
  title: 'Open in SCRAPfy',
  contexts: ['selection'],
  onclick: function () {

    // Get the selection with getSelection() coz info.selectionText
    // strip the \n, \t...
    ext.tabs.executeScript({
      code: 'window.getSelection().toString();'
    }, function (obj) {

      // Should never happen. So just in case of...
      if (!obj[0] || '' === obj[0]) {
        alert('No selection');
        return false;
      }

      createSCRAPfyRoom(obj[0]);
    });
  }
});

ext.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  
  // @if extension == 'firefox'  
  var timer;
  var sendMessage = function () {
    timer = setInterval(function () {
      ext.tabs.sendMessage(tabId, {
        action: 'change'
      }).then(function (response) {
        clearInterval(timer);
      });
    }, 200);
  }
  // @endif

  // @if extension == 'chrome'
  var sendMessage = function () {
    ext.tabs.sendMessage(tabId, { action: 'change' });
  }
  // @endif


  if (changeInfo.status === 'complete') {
    sendMessage();
  }
});
