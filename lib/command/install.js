const AbstractCommand = require('./abstractCommand');

class InstallCommand extends AbstractCommand{
    /**
     * constructor for InstallCommand
     * @param {string} task
     * @param {array} commandOptions
     * @param {array} ckanJson
     */
    constructor (task, commandOptions, ckanJson) {
        super(task, commandOptions, ckanJson);
        this.extDir = this.pathUtil.getComponentDirectory('extensions', this.ckanJson.components, commandOptions.install_dir);
        this.vendorDir = this.pathUtil.getComponentDirectory('vendor', this.ckanJson.components, commandOptions.install_dir);
        this.ckan_version = (this.commandOptions.ckan_version)? this.commandOptions.ckan_version : this.ckanJson.ckan.version;
    }

    /**
     * execute the install command
     */
    exec() {
        switch (this.task) {
        case 'extensions': {
            let ExtensionInstaller = require('./lib/install/extensions');
            ExtensionInstaller.install(this.extensions, this.extDir);
            break;
        }
        case 'ckan': {
            let CkanInstaller = require('./lib/install/ckan');
            CkanInstaller.install(this.ckan_version, this.extDir);
            break;
        }
        default:
            break;
        }
    }
}

module.exports = InstallCommand;
