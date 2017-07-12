const shell = require('shelljs');
const path = require('path');
const tar = require('tar');
const pathUtility = require('../utils/path');

class ExtensionsDownloader {

    /**
     * Download all Extensions from jsonFile with the type PyPI to the given folder
     * @param {array} extensions
     * @param {string} destinationFolder
     */
    download (extensions, destinationFolder) {
        let tempFolder = pathUtility.makeTempFolder('ckan');
        extensions.forEach(function(extension) {

            if (extension.type === 'PyPI') {
                shell.exec('pip download --no-deps ' + extension.name + '~=' + extension.version + ' --dest ' + tempFolder);
                let files = pathUtility.getFiles(tempFolder);
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
    }
}

module.exports = new ExtensionsDownloader();
