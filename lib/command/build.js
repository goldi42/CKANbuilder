const AbstractCommand = require('./abstractCommand');
const AssetsBuilder = require('./lib/build/assets');

class BuildCommand extends AbstractCommand{
    /**
     * constructor for BuildCommand
     * @param {string} task
     * @param {array} commandOptions
     * @param {array} ckanJson
     */
    constructor (task, commandOptions, ckanJson) {
        super(task, commandOptions, ckanJson);
        this.extDir = this.pathUtil.getComponentDirectory('extensions', this.ckanJson.components, commandOptions.extension_path);
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
