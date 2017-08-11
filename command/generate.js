const AbstractCommand = require('./abstractCommand');
const CkanJsonGenerator = require('../lib/generate/ckanjson');
const RequirementsFileBuilder = require('../lib/generate/requirementsFile');

class GenerateCommand extends AbstractCommand {

    /**
     * execute the generate tasks
     */
    exec () {
        switch (this.task) {
        case 'requirements': {
            RequirementsFileBuilder.build(this.extensions, this.extDir);
            break;
        }
        case 'ckanconfig': {
            let ckanConfigInitializer = new CkanJsonGenerator();
            ckanConfigInitializer.init();
            break;
        }
        default:
            break;
        }
    }
}

module.exports = GenerateCommand;
