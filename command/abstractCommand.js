const CkanJsonParser = require('../lib/utils/ckanJsonParser');
class AbstractCommand {

    /**
     * constructor
     * @param {string} task
     * @param {array} commandOptions
     * @param {array} ckanJson
     */
    constructor (task, commandOptions) {
        this.task = task;
        this.commandOptions = commandOptions;
        this.pathUtil = require('../lib/utils/path');
        this.extDir = this.pathUtil.getComponentDirectory('extensions', CkanJsonParser.getInstance().components, commandOptions.install_dir);
        this.vendorDir = this.pathUtil.getComponentDirectory('vendor', CkanJsonParser.getInstance().components, commandOptions.install_dir);
    }

    /**
     * get the extensions
     * @returns {Array}
     */
    get extensions () {
        return CkanJsonParser.getInstance().extensions;
    }

    /**
     * get the whole ckan json
     * @returns {Array}
     */
    get ckanJson () {
        return CkanJsonParser.getInstance().ckanJson;
    }

    /**
     * empty abstract method
     */
    exec () {
        throw 'implement me';
    }
}

module.exports = AbstractCommand;
