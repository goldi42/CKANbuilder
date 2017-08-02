const pathUtil = require('./lib/utils/path');
const AssetsBuilder = require('./lib/build/assets');

class BuildCommand {
    /**
     * constructor for BuildCommand
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
        this.extDir = pathUtil.getComponentDirectory('extensions', this.ckanJson.components, commandOptions.extension_path);
    }

    /**
     * execute the build command
     */
    exec () {
        switch (this.task) {
        case 'assets': {
            AssetsBuilder.build(this.ckanJson.extensions, this.extDir);
            break;
        }
        default:
            break;
        }
    }
}

module.exports = BuildCommand;
