const shell = require('shelljs');
const path = require('path');
const LogService = require('../logging/logService');

class CkanInstaller {

    /**
     * Install ckan in the given path with all dependencies
     * @param {string} ckanVersion - version of ckan
     * @param {string} destinationPath - path where can are installed
     */
    static install (ckanVersion, destinationPath) {
        let logger = LogService.getInstance().logger;
        logger.info('Start to install CKAN in Version: ' + ckanVersion);
        let ckanInstallOut = shell.exec(`pip install -e git+https://github.com/ckan/ckan.git@ckan-${ckanVersion}#egg=ckan --src ${destinationPath}`, {silent:true}).stdout;
        logger.log('verbose', 'CKAN installation finished. Details: \n' + ckanInstallOut);
        logger.info('Start to install the requirements for CKAN');
        let CkanInstallRequirementsOut = shell.exec(`pip install -r ${path.join(destinationPath, 'ckan', 'requirements.txt')}`, {silent:true}).stdout;
        logger.log('verbose', 'CKAN requirements installation finished. Details: \n' + CkanInstallRequirementsOut);
    }

}

module.exports = CkanInstaller;
