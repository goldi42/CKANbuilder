const shell = require('shelljs');
const path = require('path');
const fs = require('fs-extra');
const pathUtil = require('../utils/path');
const LogService = require('../logging/logService');

class ExtensionInstaller {

    /**
     * Install all extensions inside the given jsonFile
     * @param {array} extensions - array with all extensions
     * @param {string} installDirectory - Path to the directory where local extensions placed
     */
    static install (extensions, installDirectory) {
        let logger = LogService.getInstance();
        extensions.forEach(extension => {
            let pipCommand = '';
            switch (extension.type.toLowerCase()) {
            case 'local':
                pipCommand = `pip install -e ${path.join(installDirectory, extension.name)}`;
                break;
            case 'vcs':
                pipCommand = `pip install -e ${extension.repository}@${extension.version}#egg=${extension.name} --src ${installDirectory}`;
                break;
            default:
                pipCommand = `pip install ${extension.name}~=${extension.version}`;
                break;
            }
            logger.info(`Start Install Extension: ${extension.name}`);
            fs.ensureDirSync(installDirectory);
            let extensionInstallationResult = shell.exec(pipCommand, {silent: true});
            if (extensionInstallationResult.code === 0) {
                logger.info(`Extension ${extension.name} succesfully installed `);
            } else {
                logger.error(`Extension ${extension.name} installation failed `);
            }
            logger.verbose(`Finished ${extension.name} installation! Output: \n` + extensionInstallationResult.stdout);
            // Install extension dependencies
            let extensionDirectory = pathUtil.getDirectories(installDirectory).filter(directory => directory == extension.name).shift();
            let dependencyFile = pathUtil.getFiles(path.join(installDirectory,extensionDirectory)).filter(file => file == 'requirements.txt'|| file == 'pip-requirements.txt').shift();
            if (typeof(dependencyFile) !== 'undefined') {
                logger.info(`Start to Install the Requrements for the Extension: ${extension.name}`);
                let extensionRequirementsResult = shell.exec(`pip install -r ${path.join(installDirectory, extensionDirectory, dependencyFile)}`, {silent: true});
                if (extensionRequirementsResult.code === 0) {
                    logger.info('Requirements successfully installed');
                } else {
                    logger.error('Requirements failed to install');
                }
                logger.verbose(`Finished requirements installation for ${extension.name}! Output : \n` + extensionRequirementsResult.stdout);
            }
        });
    }
}

module.exports = ExtensionInstaller;
