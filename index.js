const CkanJsonParser = require('./lib/utils/ckanJsonParser');

const BuildCommand = require('./command/build');
const InstallCommand = require('./command/install');
const DownloadCommand = require('./command/download');
const ConfigureCommand = require('./command/configure');
const GenerateCommand = require('./command/generate');

let program = require('commander');

program
    .version('1.0.0')
    .description('ckan build tool for common tasks');

program
    .command('build <task>')
    .description('build operations')
    .option('-c, --ckanconfig_path [path]','Path to Ckan.json File with ckan config')
    .option('-e, --extension_path [path]', 'Path where the extension are saved')
    .action((task, command) => {
        updateCkanConfigPath(command);
        let buildCommand = new BuildCommand(task, command);
        buildCommand.exec();
    });
program
    .command('install <task>')
    .description('install ckan or all extensions for ckan. Valid tasks are \'ckan\' and \'extensions\' ')
    .option('-c, --ckanconfig_path [path]','Path to Ckan.json File with ckan config')
    .option('-d, --install_dir [path]','directory for installation')
    .option('-i, --ckan_version [version]', 'ckan version which should be installed')
    .action( (task, command) => {
        updateCkanConfigPath(command);
        let installCommand = new InstallCommand(task, command);
        installCommand.exec();
    });

program
    .command('download <task>')
    .description('download ckan or all extensions')
    .option('-c, --ckanconfig_path [path]','Path to Ckan.json File with ckan config')
    .option('-d, --install_dir [path]','directory for installation')
    .option('-i, --ckan_version [version]', 'ckan version which should be installed', '2.5.5')
    .action( (task, command) => {
        updateCkanConfigPath(command);
        let downloadCommand = new DownloadCommand(task, command);
        downloadCommand.exec();
    });

program
    .command('configure <task>')
    .option('-i, --configini_file <file>','Ckan config ini')
    .option('-c, --ckanconfig_path [path]','Path to Ckan.json File with ckan config')
    .action( (task, command) => {
        updateCkanConfigPath(command);
        let configureCommand = new ConfigureCommand(task,command);
        configureCommand.exec();
    });

program
    .command('generate <task>')
    .action( (task, command) => {
        let generateCommand = new GenerateCommand(task, command);
        generateCommand.exec();
    });
program.parse(process.argv);

function updateCkanConfigPath (command) {
    if (command.ckanconfig_path) {
        CkanJsonParser.getInstance().directory = command.ckanconfig_path;
    }
}
