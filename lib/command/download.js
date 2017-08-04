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
        this.ckan_version = (this.commandOptions.ckan_version)? this.commandOptions.ckan_version : this.ckanJson.ckan.version;
    }

    /**
     * execute the download tasks
     */
    exec () {
        switch (this.task) {
        case 'ckan': {
            let CkanDownloader = require('./lib/download/ckan');
            CkanDownloader.download(this.ckan_version, this.vendorDir);
            break;
        }
        case 'extensions': {
            let ExtensionDownloader = require('./lib/download/extensions');
            ExtensionDownloader.download(this.extensions, this.extDir);
            break;
        }
        default:
            break;
        }
    }
}

module.exports = DownloadCommand;
