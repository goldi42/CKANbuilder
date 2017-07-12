const path = require('path');
const pathUtil = require('./lib/utils/path');
let program = require('commander');

program
    .version('0.0.1')
    .description('ckan build tool for common tasks');

program
    .command('build <task>')
    .description('build operations')
    .option('-c, --ckanconfig_file [file]','JSON File with ckan config')
    .option('-o, --output [path]', 'Path where the results should save')
    .option('-e, --extension_path [path]', 'Path where the extension are saved')
    .action((task, command) => {
        let ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'config', 'ckanconfig.json');
        let ckanConfig = require(ckanconfigFile);
        switch (task) {
        case 'requirements':
            var requirementsFileBuilder = require('./lib/build/requirementsFile');
            requirementsFileBuilder.build(ckanConfig.extensions, pathUtil.getComponentDirectory('extensions', ckanConfig.components, command.output));
            break;
        case 'assets':
            var assetsBuilder = require('./lib/build/assets');
            assetsBuilder.build(ckanConfig.extensions, pathUtil.getComponentDirectory('extensions', ckanConfig.components));
            break;
        default:
            break;
        }
    });
program
    .command('install <task>')
    .description('install ckan or all extensions for ckan. Valid tasks are \'ckan\' and \'extensions\' ')
    .option('-c, --ckanconfig_file [file]','JSON File with ckan config')
    .option('-i, --install_dir [path]','directory for installation', path.join(process.cwd(), 'extension'))
    .option('-c, --ckan_version [version]', 'ckan version which should be installed')
    .action( (task, command) => {
        let ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'config', 'ckanconfig.json');
        let ckanConfig = require(ckanconfigFile);
        switch (task) {
        case 'extensions':
            var extensionInstaller = require('./lib/install/extensions');
            extensionInstaller.install(ckanConfig.extensions, pathUtil.getComponentDirectory('extensions', ckanConfig.components, command.install_dir));
            break;
        case 'ckan':
            var ckan_version = (command.ckan_version)? command.ckan_version : ckanConfig.ckan.version;
            var ckanInstaller = require('./lib/install/ckan');
            ckanInstaller.install(ckan_version, pathUtil.getComponentDirectory('extensions', ckanConfig.components, command.install_dir));
            break;
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
        let ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'config', 'ckanconfig.json');
        let ckanConfig = require(ckanconfigFile);

        switch (task) {
        case 'ckan':
            var ckanDownloader = require('./lib/download/ckan');
            ckanDownloader.download(command.ckan_version, (command.install_dir)? command.install_dir : pathUtil.determineDefaultFolder(task, ckanConfig.components, path.join(process.cwd(), 'vendor')));
            break;
        case 'extensions':
            var extensionDownloader = require('./lib/download/extensions');
            extensionDownloader.download(ckanConfig.extensions, (command.install_dir)? command.install_dir : pathUtil.determineDefaultFolder(task, ckanConfig.components, path.join(process.cwd(), 'extensions')));
            break;
        default:
            break;
        }
    });

program.parse(process.argv);
