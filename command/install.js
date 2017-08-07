const AbstractCommand = require('./abstractCommand');
const ExtensionInstaller = require('../lib/install/extensions');
const CkanInstaller = require('../lib/install/ckan');

class InstallCommand extends AbstractCommand{
    /**
     * constructor for InstallCommand
     * @param {string} task
     * @param {array} commandOptions
     * @param {array} ckanJson
     */
    constructor (task, commandOptions) {
        super(task, commandOptions);
        this.ckan_version = (this.commandOptions.ckan_version)? this.commandOptions.ckan_version : this.ckanJson.ckan.version;
    }

    /**
     * execute the install command
     */
    exec() {
        switch (this.task) {
        case 'extensions': {
            ExtensionInstaller.install(this.extensions, this.extDir);
            break;
        }
        case 'ckan': {
            CkanInstaller.install(this.ckan_version, this.extDir);
            break;
        }
        default:
            break;
        }
    }
}

module.exports = InstallCommand;
