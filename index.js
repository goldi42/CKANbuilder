const CkanJsonParser = require('./lib/utils/ckanJsonParser');
const LogService = require('./lib/logging/logService');
const pathUtil = require('./lib/utils/path');

const BuildCommand = require('./command/build');
const InstallCommand = require('./command/install');
const DownloadCommand = require('./command/download');
const ConfigureCommand = require('./command/configure');
const GenerateCommand = require('./command/generate');

let program = require('commander');

program
    .version('1.0.0')
    .description('ckan build tool for common tasks')
    .option('-l, --file_log','activate the filelog', false)
    .option('-c, --ckanconfig_path [path]','Path to Ckan.json File with ckan config');

program
    .command('build <task>')
    .description('build operations')
    .option('-e, --extension_path [path]', 'Path where the extension are saved')
    .action((task, command) => {
        updateEnvironment(this.parent);
        let buildCommand = new BuildCommand(task, command);
        buildCommand.exec();
    });
program
    .command('install <task>')
    .description('install ckan or all extensions for ckan. Valid tasks are \'ckan\' and \'extensions\' ')
    .option('-d, --install_dir [path]','directory for installation')
    .option('-i, --ckan_version [version]', 'ckan version which should be installed')
    .action( (task, command) => {
        updateEnvironment(command.parent);
        let installCommand = new InstallCommand(task, command);
        installCommand.exec();
    });

program
    .command('download <task>')
    .description('download ckan or all extensions')
    .option('-d, --install_dir [path]','directory for installation')
    .option('-i, --ckan_version [version]', 'ckan version which should be installed', '2.5.5')
    .action( (task, command) => {
        updateEnvironment(command.parent);
        let downloadCommand = new DownloadCommand(task, command);
        downloadCommand.exec();
    });

program
    .command('configure <task>')
    .option('-i, --configini_file <file>','Ckan config ini')
    .action( (task, command) => {
        updateEnvironment(command.parent);
        let configureCommand = new ConfigureCommand(task,command);
        configureCommand.exec();
    });

program
    .command('generate <task>')
    .action( (task, command) => {
        updateEnvironment(command.parent);
        let generateCommand = new GenerateCommand(task, command);
        generateCommand.exec();
    });
program.parse(process.argv);

function updateEnvironment(program) {
    if (program.ckanconfig_path) {
        CkanJsonParser.getInstance().directory = program.ckanconfig_path;
    }

    if (program.file_log) {
        LogService.getInstance().initializeFileLog(CkanJsonParser.getInstance().ckanJson.filelog, pathUtil.getComponentDirectory('logs', CkanJsonParser.getInstance().components));
    }
}
