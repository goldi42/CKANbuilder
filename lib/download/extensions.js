const shell = require('shelljs');
const path = require('path');
const tar = require('tar');
const pathUtility = require('../utils/path');
const logger = require('../logging/logService').getInstance();

class ExtensionsDownloader {

    /**
     * Download all Extensions from jsonFile with the type PyPI to the given folder
     * @param {array} extensions
     * @param {string} destinationFolder
     */
    static download (extensions, destinationFolder) {
        let tempFolder = pathUtility.makeTempFolder('ckan');
        extensions.forEach(extension => {
            logger.info('Start to download extensions');
            switch (extension.type.toLowerCase()) {
            case 'pypi':
                this._downloadFromPyPI(extension, tempFolder, destinationFolder);
                break;
            case 'vcs':
                this._downloadFromVcs(extension, destinationFolder);
                break;
            }
        });
    }

    /**
     * Download the sources from PyPI
     *
     * @param {Object} extension
     * @param {string} tempFolder
     * @param {string} destinationFolder
     */
    static _downloadFromPyPI (extension, tempFolder, destinationFolder) {
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

    /**
     * Download the source from VCS
     * @param {Object} extension
     * @param {string} destinationFolder
     */
    static _downloadFromVcs (extension, destinationFolder) {
        shell.exec( `pip download --no-deps ${extension.repository} --dest ${destinationFolder}`);
    }
}

module.exports = ExtensionsDownloader;
