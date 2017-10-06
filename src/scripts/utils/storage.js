var ext = require('./ext');

module.exports = (ext.storage.sync ? ext.storage.sync : ext.storage.local);
