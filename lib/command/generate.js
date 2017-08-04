const AbstractCommand = require('./abstractCommand');
const CkanConfigInitializer = require('./lib/generate/ckanconfig');

class GenerateCommand extends AbstractCommand {

    /**
     * execute the generate tasks
     */
    exec () {
        switch (this.task) {
        case 'requirements': {
            const RequirementsFileBuilder = require('./lib/generate/requirementsFile');
            RequirementsFileBuilder.build(this.extensions, this.extDir);
            break;
        }
        case 'ckanconfig': {
            let ckanConfigInitializer = new CkanConfigInitializer();
            ckanConfigInitializer.init();
            break;
        }
        default:
            break;
        }
    }
}

module.exports = GenerateCommand;
