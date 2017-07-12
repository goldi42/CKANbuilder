const shell = require('shelljs');
const path = require('path');

class ExtensionInstaller {

    /**
     * Install all extensions inside the given jsonFile
     * @param {array} extensions - array with all extensions
     * @param {string} installDirectory - Path to the directory where local extensions placed
     */
    install (extensions, installDirectory) {

        extensions.forEach( (extension) => {
            let pipCommand = '';
            switch (extension.type) {
            case 'local':
                pipCommand = 'pip install -e'+ path.join(installDirectory, extension.name);
                break;
            case 'vcs':
                console.info('not implemented yet');
                break;
            default:
                pipCommand = 'pip install ${extension.name}~=${extension.version}';
                break;
            }
            shell.exec(pipCommand);
        }, this);
    }
}

module.exports = new ExtensionInstaller();
