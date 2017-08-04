const AbstractCommand = require('./abstractCommand');
const AssetsBuilder = require('../lib/build/assets');

class BuildCommand extends AbstractCommand{

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
