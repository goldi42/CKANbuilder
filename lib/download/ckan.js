const shell = require('shelljs');
const logger = require('../logging/logService').getInstance();

class CkanDownloader {
    /**
     * download ckan in an given version to a user specified folder
     * @param {string} ckan_version - version of ckan
     * @param {string} destinationFolder - version where ckan will downloaded
     */
    static download (ckan_version, destinationFolder) {
        logger.info('Start to download ckan');
        shell.exec(`pip download git+https://github.com/ckan/ckan.git@ckan-${ckan_version} -src ${destinationFolder}`);
    }

}

module.exports = CkanDownloader;
