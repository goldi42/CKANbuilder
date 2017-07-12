const shell = require('shelljs');
const path = require('path');

class CkanInstaller {

    /**
     * Install ckan in the given path with all dependencies
     * @param {string} ckanVersion - version of ckan
     * @param {string} destinationPath - path where can are installed
     */
    install (ckanVersion, destinationPath) {
        shell.exec('pip install -e git+https://github.com/ckan/ckan.git@ckan-${ckanVersion}#egg=ckan --src ${destinationPath}');
        shell.exec('pip install -r ' + path.join(destinationPath, 'requirements.txt'));
    }

}

module.exports = new CkanInstaller();
