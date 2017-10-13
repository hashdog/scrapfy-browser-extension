var $ = require('./vendor/jquery.min');
var ext = require('./utils/ext');
var langs = require('./langs');

$(document).on('ready', function () {
  var lastLangStr = localStorage.getItem('lastLang');
  var lastLangObj = langs.find(function(lang) {
    return lang.value === lastLangStr;
  });

  var $langSelector = $('#lang-selector');

  // Set the last lang selected
  if (lastLangStr !== null && lastLangStr !== 'plain_text') {
    $langSelector
      .append('<option value="' + lastLangObj.value + '">' + lastLangObj.label + '</option>')
      .append('<option value="--">------</option>');
  }

  langs.forEach(function(lang) {
    $langSelector.append('<option value="' + lang.value + '">' + lang.label + '</option>');
  });

  $langSelector.on('change', function() {

    // Get and save the selected lang
    var lang = $langSelector.val();

    if (lang === '--') {
      $langSelector.val('');
    } else {
      if (lang != lastLangStr) {
        localStorage.setItem('lastLang', lang);
      }

      $langSelector.hide();
      $('#loading').show();

      // Get the SCRAP data and open the new tab
      $.ajax({
        type: 'POST',
        url: 'https://api.scrapfy.io/scraps',
        contentType: 'application/json',
        data: JSON.stringify({ lang: lang }),
        dataType: 'json'
      })
      .done(function(data) {
        window.close();
        ext.tabs.create({ url: data.url });
        return;
      });
    }
  });
});
