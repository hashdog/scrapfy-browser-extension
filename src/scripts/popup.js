var ext = require('./utils/ext');
var $ = require('./vendor/jquery.min');
var langs = require('./langs');

$(document).on('ready', function () {
  var lastLangStr = localStorage.getItem('lastLang');
  var lastLangObj = langs.find(function(lang) {
    return lang.value === lastLangStr;
  });

  var $langSelector = $('#lang-selector');

  langs.forEach(function(lang) {
    $langSelector.append('<option value="' + lang.value + '">' + lang.label + '</option>');
  });

  // Set the last lang selected
  if (lastLangStr !== null && lastLangStr !== 'plain_text') {
    $langSelector
      .prepend('<option value="-">------</option>')
      .prepend('<option value="' + lastLangObj.value + '">' + lastLangObj.label + '</option>');
  }

  $langSelector
    .prepend('<option value="">Select a lang...</option>')
    .val('')
    .on('change', function() {
      $('#loading').show();
      $langSelector.hide();

      // Get and save the selected lang
      var lang = $langSelector.val();
      if (lang != lastLangStr) {
        localStorage.setItem('lastLang', lang);
      }

      // Get the SCRAP data and open the new tab
      $.ajax({
        type: 'POST',
        url: 'https://api.scrapfy.io/scraps',
        contentType: 'application/json',
        data: JSON.stringify({ lang: lang }),
        dataType: 'json'
      })
      .done(function(data) {
        ext.tabs.create({
          url: data.url
        });

        window.close();

        return;
      });
    });
});
