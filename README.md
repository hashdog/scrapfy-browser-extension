# SCRAPfy browser extension

[![GitHub tag](https://img.shields.io/github/tag/hashdog/scrapfy-browser-extension.svg?style=flat-square)]()
[![Chrome Web Store](https://img.shields.io/chrome-web-store/v/emackoodkdoeflcpjfbdljlfckgbmnae.svg?style=flat-square)](https://chrome.google.com/webstore/detail/scrapfy/emackoodkdoeflcpjfbdljlfckgbmnae)
[![Mozilla Add-on](https://img.shields.io/amo/v/scrapfy-shared-code-editor.svg?style=flat-square)](https://addons.mozilla.org/addon/scrapfy-shared-code-editor)


This is our browser extension code for Chrome, Firefox and Opera.


## Features
Open a SCRAPfy room from:

- Snippets in SctackOverflow and partially (yet) GitHub
- Chrome|Opera|FF Menu by selecting a language
- Context menu by selecting some text


## Install from Chrome Web Store
https://chrome.google.com/webstore/detail/scrapfy/emackoodkdoeflcpjfbdljlfckgbmnae


## Install from Add-ons for Firefox
https://addons.mozilla.org/addon/scrapfy-shared-code-editor


## Load the extension in Chrome & Opera
1. Open Chrome/Opera browser and navigate to chrome://extensions
2. Select "Developer Mode" and then click "Load unpacked extension..."
3. From the file browser, choose to `path/to/chrome` or (`path/to/opera`)


## Load the extension in Firefox
1. Open Firefox browser and navigate to about:debugging
2. Click "Load Temporary Add-on" and from the file browser, choose `path/to/firefox`


## Developing
The following tasks can be used when you want to start developing and want to enable live reload

- `npm run chrome-watch`
- `npm run opera-watch`
- `npm run firefox-watch`


## Packaging
Run `npm run dist` to create a zipped, production-ready extension for each browser. You can then upload that to the appstore.

Go to [SCRAPfy](http://scrapfy.io/) for more details about the app.
