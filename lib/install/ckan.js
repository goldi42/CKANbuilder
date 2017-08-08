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
        let ckanInstallOut = shell.exec(`pip install -e git+https://github.com/ckan/ckan.git@ckan-${ckanVersion}#egg=ckan --src ${destinationPath}`, {silent:true}).stdout;
        let CkanInstallRequirementsOut = shell.exec(`pip install -r ${path.join(destinationPath, 'ckan', 'requirements.txt')}`, {silent:true}).stdout;
        logger.info('ckan installation \n' + ckanInstallOut);
        logger.info('ckan requirements installation \n' + CkanInstallRequirementsOut);
    }

}

module.exports = CkanInstaller;
