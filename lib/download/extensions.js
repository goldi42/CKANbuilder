var shell = require('shelljs');
var path = require('path');
var tar = require('tar');
var pathUtility = require('../utils/path');
var ExtensionsDownloader = function () {};

/**
 * Download all Extensions from jsonFile with the type PyPI to the given folder
 * @param {string} jsonFile
 * @param {string} destinationFolder
 */
ExtensionsDownloader.prototype.download = (jsonFile, destinationFolder) => {
    var extensionJson = require(jsonFile);
    var tempFolder = pathUtility.makeTempFolder('ckan');
    extensionJson.extensions.forEach(function(extension) {

        if (extension.type === 'PyPI') {
            shell.exec('pip download --no-deps ' + extension.name + '~=' + extension.version + ' --dest ' + tempFolder);
            var files = pathUtility.getFiles(tempFolder);
            if (files.length === 1) {
                tar.extract({sync:true,
                    file: path.join(tempFolder, files[0]),
                });
            } else {
                throw new Error('there are more just one file inside the folder');
            }
            var folders = pathUtility.getDirectories(tempFolder);
            if (folders.length === 1) {
                pathUtility.moveTo(path.join(tempFolder, folders[0]), path.join(destinationFolder, folders[0]));
            }
        }

    }, this);
};

module.exports = new ExtensionsDownloader();
