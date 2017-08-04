const path = require('path');

const BuildCommand = require('./lib/command/build');
const InstallCommand = require('./lib/command/install');
const DownloadCommand = require('./lib/command/download');
const ConfigureCommand = require('./lib/command/configure');
const GenerateCommand = require('./lib/command/generate');

let program = require('commander');


program
    .version('1.0.0')
    .description('ckan build tool for common tasks');

program
    .command('build <task>')
    .description('build operations')
    .option('-c, --ckanconfig_file [file]','JSON File with ckan config')
    .option('-e, --extension_path [path]', 'Path where the extension are saved')
    .action((task, command) => {
        let ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'ckanconfig.json');
        let ckanConfig = require(ckanconfigFile);
        let buildCommand = new BuildCommand(task, command, ckanConfig);
        buildCommand.exec();
    });
program
    .command('install <task>')
    .description('install ckan or all extensions for ckan. Valid tasks are \'ckan\' and \'extensions\' ')
    .option('-c, --ckanconfig_file [file]','JSON File with ckan config')
    .option('-d, --install_dir [path]','directory for installation')
    .option('-i, --ckan_version [version]', 'ckan version which should be installed')
    .action( (task, command) => {
        let ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'ckanconfig.json');
        let ckanConfig = require(ckanconfigFile);
        let installCommand = new InstallCommand(task, command, ckanConfig);
        installCommand.exec();
    });

program
    .command('download <task>')
    .description('download ckan or all extensions')
    .option('-c, --ckanconfig_file [file]','JSON File with ckan config')
    .option('-d, --install_dir [path]','directory for installation', path.join(process.cwd(), 'extension'))
    .option('-i, --ckan_version [version]', 'ckan version which should be installed', '2.5.5')
    .action( (task, command) => {
        let ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'ckanconfig.json');
        let ckanConfig = require(ckanconfigFile);
        let downloadCommand = new DownloadCommand(task, command, ckanConfig);
        downloadCommand.exec();

    });

program
    .command('configure <task>')
    .option('-i, --configini_file <file>','Ckan config ini')
    .option('-c, --ckanconfig_file [file]','JSON File with ckan config')
    .action( (task, command) => {
        let ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'ckanconfig.json');
        let ckanConfig = require(ckanconfigFile);
        let configureCommand = new ConfigureCommand(task,command,ckanConfig);
        configureCommand.exec();

    });

program
    .command('generate <task>')
    .action( (task, command) => {
        let ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'ckanconfig.json');
        let ckanConfig = require(ckanconfigFile);
        let generateCommand = new GenerateCommand(task, command, ckanConfig);
        generateCommand.exec();
    });
program.parse(process.argv);
