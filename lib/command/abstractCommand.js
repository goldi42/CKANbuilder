
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
        if (ckanJson.extensions) {
            this.extensions = ckanJson.extensions;
        }
        this.pathUtil = require('./lib/utils/path');
    }

    /**
     * empty abstract method
     */
    exec () {
        throw 'implement me';
    }
}

module.exports = AbstractCommand;
