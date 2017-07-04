const shell = require('shelljs');
const path = require('path');

var ExtensionInstaller = function () {};

/**
 * Install all extensions inside the given jsonFile
 * @param {string} jsonFile - Path to the jsonFile
 * @param {string} installDirectory - Path to the directory where local extensions placed
 */
ExtensionInstaller.prototype.install = (jsonFile, installDirectory) => {
    var extensionJson = require(jsonFile);

    extensionJson.extensions.forEach( (extension) => {
        var pipCommand = '';
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
};

module.exports = new ExtensionInstaller();
