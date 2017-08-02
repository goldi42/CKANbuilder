const path = require('path');
const pathUtil = require('./lib/utils/path');
const inquirer = require('inquirer');
let program = require('commander');

program
    .version('1.0.0')
    .description('ckan build tool for common tasks');

program
    .command('build <task>')
    .description('build operations')
    .option('-c, --ckanconfig_file [file]','JSON File with ckan config')
    .option('-o, --output [path]', 'Path where the results should save')
    .option('-e, --extension_path [path]', 'Path where the extension are saved')
    .action((task, command) => {
        let ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'ckanconfig.json');
        let ckanConfig = require(ckanconfigFile);
        switch (task) {
        case 'assets': {
            var assetsBuilder = require('./lib/build/assets');
            assetsBuilder.build(ckanConfig.extensions, pathUtil.getComponentDirectory('extensions', ckanConfig.components));
            break;
        }
        default:
            break;
        }
    });
program
    .command('install <task>')
    .description('install ckan or all extensions for ckan. Valid tasks are \'ckan\' and \'extensions\' ')
    .option('-c, --ckanconfig_file [file]','JSON File with ckan config')
    .option('-i, --install_dir [path]','directory for installation')
    .option('-c, --ckan_version [version]', 'ckan version which should be installed')
    .action( (task, command) => {
        let ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'ckanconfig.json');
        let ckanConfig = require(ckanconfigFile);
        switch (task) {
        case 'extensions': {
            let extensionInstaller = require('./lib/install/extensions');
            extensionInstaller.install(ckanConfig.extensions, pathUtil.getComponentDirectory('extensions', ckanConfig.components, command.install_dir));
            break;
        }
        case 'ckan': {
            let ckan_version = (command.ckan_version)? command.ckan_version : ckanConfig.ckan.version;
            let ckanInstaller = require('./lib/install/ckan');
            ckanInstaller.install(ckan_version, pathUtil.getComponentDirectory('extensions', ckanConfig.components, command.install_dir));
            break;
        }
        default:
            break;
        }
    });

program
    .command('download <task>')
    .description('download ckan or all extensions')
    .option('-c, --ckanconfig_file [file]','JSON File with ckan config')
    .option('-i, --install_dir [path]','directory for installation', path.join(process.cwd(), 'extension'))
    .option('-C, --ckan_version [version]', 'ckan version which should be installed', '2.5.5')
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
