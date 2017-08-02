const shell = require('shelljs');
const path = require('path');
const pathUtil = require('../utils/path');

class ExtensionInstaller {

    /**
     * Install all extensions inside the given jsonFile
     * @param {array} extensions - array with all extensions
     * @param {string} installDirectory - Path to the directory where local extensions placed
     */
    static install (extensions, installDirectory) {

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
            shell.exec(pipCommand);
            // Install extension dependencies
            let extensionDirectory = pathUtil.getDirectories(installDirectory).filter(directory => directory == extension.name).shift();
            let dependencyFile = pathUtil.getFiles(path.join(installDirectory,extensionDirectory)).filter(file => file == 'requirements.txt'|| file == 'pip-requirements.txt').shift();
            if (typeof(dependencyFile) !== 'undefined') {
                shell.exec(`pip install -r ${path.join(installDirectory, extensionDirectory, dependencyFile)}`);
            }
        });
    }
}

module.exports = ExtensionInstaller;
