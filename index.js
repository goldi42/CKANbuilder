const path = require('path');
const pathUtil = require('./lib/utils/path');
const inquirer = require('inquirer');

const BuildCommand = require('./lib/command/build');
const InstallCommand = require('./lib/command/install');
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

        switch (task) {
        case 'ckan': {
            let ckanDownloader = require('./lib/download/ckan');
            ckanDownloader.download(command.ckan_version, (command.install_dir)? command.install_dir : pathUtil.determineDefaultFolder(task, ckanConfig.components, path.join(process.cwd(), 'vendor')));
            break;
        }
        case 'extensions': {
            let extensionDownloader = require('./lib/download/extensions');
            extensionDownloader.download(ckanConfig.extensions, (command.install_dir)? command.install_dir : pathUtil.determineDefaultFolder(task, ckanConfig.components, path.join(process.cwd(), 'extensions')));
            break;
        }
        default:
            break;
        }
    });

program
    .command('configure <task>')
    .option('-i, --configini_file <file>','Ckan config ini')
    .option('-c, --ckanconfig_file [file]','JSON File with ckan config')
    .action( (task, command) => {
        let ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'ckanconfig.json');
        let ckanConfig = require(ckanconfigFile);
        switch (task) {
        case 'plugins': {
            let pluginConfigurationManager = require('./lib/configure/plugins');
            pluginConfigurationManager.activateCkanPlugins(ckanConfig.config.plugins, command.configini_file);
            break;
        }
        case 'sysadmin': {
            let userConfigurationManager = require('./lib/configure/user');
            let userData = userConfigurationManager.getPromptFields();
            inquirer.prompt(userData).then( answers => {
                userConfigurationManager.addSysadminUser(answers.username, answers.password, answers.email, command.configini_file);
            });
            break;
        }
        case 'user': {
            let userConfigurationManager = require('./lib/configure/user');
            let userData = userConfigurationManager.getPromptFields();
            inquirer.prompt(userData).then( answers => {
                userConfigurationManager.addUser(answers.username, answers.password, answers.email, command.configini_file);
            });
            break;
        }
        default:
            break;
        }

    });

program
    .command('generate <task>')
    .action( (task, command) => {
        let ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'ckanconfig.json');
        let ckanConfig = require(ckanconfigFile);
        switch (task) {
        case 'requirements': {
            var requirementsFileBuilder = require('./lib/build/requirementsFile');
            requirementsFileBuilder.build(ckanConfig.extensions, pathUtil.getComponentDirectory('extensions', ckanConfig.components, command.output));
            break;
        }
        case 'ckanconfig': {
            let ckanConfigInitializer = require('./lib/init/ckanconfig');
            ckanConfigInitializer.init();
            break;
        }
        default:
            break;
        }
    });
program.parse(process.argv);
