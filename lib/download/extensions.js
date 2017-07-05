var shell = require('shelljs');
var path = require('path');
var tar = require('tar');
var pathUtility = require('../utils/path');
var ExtensionsDownloader = function () {};

/**
 * Download all Extensions from jsonFile with the type PyPI to the given folder
 * @param {array} extensions
 * @param {string} destinationFolder
 */
ExtensionsDownloader.prototype.download = (extensions, destinationFolder) => {
    var tempFolder = pathUtility.makeTempFolder('ckan');
    extensions.forEach(function(extension) {

        if (extension.type === 'PyPI') {
            shell.exec('pip download --no-deps ' + extension.name + '~=' + extension.version + ' --dest ' + tempFolder);
            var files = pathUtility.getFiles(tempFolder);
            if (files.length === 1) {
                tar.extract({sync:true,
                    file: path.join(tempFolder, files[0]),
                    cwd: destinationFolder
                });
            } else {
                throw new Error('there are more just one file inside the folder');
            }
        }

    }, this);
};

module.exports = new ExtensionsDownloader();
