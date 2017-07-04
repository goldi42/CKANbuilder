var shell = require('shelljs');

var ExtensionsDownloader = function () {};

/**
 * Download all Extensions from jsonFile with the type PyPI to the given folder
 * @param {string} jsonFile
 * @param {string} destinationFolder
 */
ExtensionsDownloader.prototype.download = (jsonFile, destinationFolder) => {
    var extensionJson = require(jsonFile);

    extensionJson.extensions.forEach(function(extension) {
        if (extension.type === 'PyPI') {
            shell.exec('pip download -e ' + extension.name + '~=' + extension.version + ' --src ' + destinationFolder);
        }
    }, this);
};

module.exports = new ExtensionsDownloader();
