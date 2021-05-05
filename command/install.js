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
        this.pip_pep_517 = (this.commandOptions.no_use_pep517)? '--no-use-pep-517' : '';
    }

    /**
     * execute the install command
     */
    exec() {
        switch (this.task) {
        case 'extensions': {
            ExtensionInstaller.install(this.extensions, this.extDir, this.pip_pep_517);
            break;
        }
        case 'ckan': {
            CkanInstaller.install(this.ckan_version, this.extDir, this.pip_pep_517);
            break;
        }
        default:
            break;
        }
    }
}

module.exports = InstallCommand;
