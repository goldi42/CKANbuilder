const shell = require('shelljs');
const path = require('path');
const fs = require('fs-extra');
const LogService = require('../logging/logService');

class CkanInstaller {

    /**
     * Install CKAN in the given path with all dependencies
     * @param {string} ckanVersion - version of ckan
     * @param {string} destinationPath - path where can are installed
     */
    static install (ckanVersion, destinationPath) {
        let logger = LogService.getInstance();
        logger.info('Start to install CKAN in Version: ' + ckanVersion);
        fs.ensureDirSync(destinationPath);
        let ckanInstallResults = shell.exec(`pip install -e git+https://github.com/ckan/ckan.git@ckan-${ckanVersion}#egg=ckan --src ${destinationPath}`, {silent:true});
        if (ckanInstallResults.code === 0) {
            logger.info('CKAN installation successful');
        } else {
            logger.error('CKAN installation failed');
        }
        logger.verbose('CKAN installation details: \n' + ckanInstallResults.stdout);
        logger.info('Start to install the requirements for CKAN');
        let ckanInstallRequirementsResult = shell.exec(`pip install -r ${path.join(destinationPath, 'ckan', 'requirements.txt')}`, {silent:true});
        if (ckanInstallRequirementsResult.code === 0) {
            logger.info('CKAN requirements installation successful');
        } else {
            logger.error('CKAN requirements installation failed');
        }

        logger.verbose('CKAN requirements installation finished. Details: \n' + ckanInstallRequirementsResult.stdout);
    }

}

module.exports = CkanInstaller;
