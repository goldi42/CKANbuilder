
class AbstractCommand {

    /**
     * constructor
     * @param {string} task
     * @param {array} commandOptions
     * @param {array} ckanJson
     */
    constructor (task, commandOptions, ckanJson) {
        this.task = task;
        this.ckanJson = ckanJson;
        this.commandOptions = commandOptions;
        if (ckanJson.extensions) {
            this.extensions = ckanJson.extensions;
        }
        this.pathUtil = require('./lib/utils/path');
        this.extDir = this.pathUtil.getComponentDirectory('extensions', this.ckanJson.components, commandOptions.install_dir);
        this.vendorDir = this.pathUtil.getComponentDirectory('vendor', this.ckanJson.components, commandOptions.install_dir);
    }

    /**
     * empty abstract method
     */
    exec () {
        throw 'implement me';
    }
}

module.exports = AbstractCommand;
