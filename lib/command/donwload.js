const AbstractCommand = require('./abstractCommand');
class DownloadCommand extends AbstractCommand {

    /**
     * constructor for DownloadCommand
     * @param {string} task
     * @param {array} commandOptions
     * @param {array} ckanJson
     */
    constructor (task, commandOptions, ckanJson) {
        super(task, commandOptions, ckanJson);
        this.vendorDir = this.pathUtil.getComponentDirectory('vendor', this.ckanJson.components, commandOptions.install_dir);
        this.extDir = this.pathUtil.getComponentDirectory('extensions', this.ckanJson.components, commandOptions.install_dir);
        this.ckan_version = (this.commandOptions.ckan_version)? this.commandOptions.ckan_version : this.ckanJson.ckan.version;
    }

    /**
     * execute the download tasks
     */
    exec () {
        switch (this.task) {
        case 'ckan': {
            let ckanDownloader = require('./lib/download/ckan');
            ckanDownloader.download(this.ckan_version, this.vendorDir);
            break;
        }
        case 'extensions': {
            let extensionDownloader = require('./lib/download/extensions');
            extensionDownloader.download(this.extensions, this.extDir);
            break;
        }
        default:
            break;
        }
    }
}

module.exports = DownloadCommand;
