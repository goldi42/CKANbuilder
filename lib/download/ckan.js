const shell = require('shelljs');

var CkanDownloader = function () {};

/**
 * download ckan in an given version to a user specified folder
 * @param {string} ckan_version - version of ckan
 * @param {string} destinationFolder - version where ckan will downloaded
 */
CkanDownloader.prototype.download = (ckan_version, destinationFolder) => {
    shell.exec('pip download git+https://github.com/ckan/ckan.git@ckan-' + ckan_version + ' -src ' + destinationFolder);
};


module.exports = new CkanDownloader();
