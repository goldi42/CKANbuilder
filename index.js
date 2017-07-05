const path = require('path');
var program = require('commander');

program
    .version('0.0.1')
    .description('ckan build tool for common tasks');

program
    .command('build <task>')
    .description('build operations')
    .option('-c, --ckanconfig_file [file]','JSON File with ckan config')
    .option('-o, --output [path]', 'Path where the results wood save')
    .action((task, command) => {
        switch (task) {
        case 'requirements':
            var ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'config', 'ckanconfig.json');
            var ckanConfig = require(ckanconfigFile);
            var outputPath = (command.output)? command.output : path.join(process.cwd(), 'extensions');
            var requirementsFileBuilder = require('./lib/build/requirementsFile');
            requirementsFileBuilder.build(ckanConfig.extensions, outputPath);
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
    .option('-c, --ckan_version [version]', 'ckan version which should be installed', '2.5.5')
    .action( (task, command) => {
        var ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'config', 'ckanconfig.json');
        var ckanConfig = require(ckanconfigFile);
        switch (task) {
        case 'extensions':
            var extensionInstaller = require('./lib/install/extensions');
            extensionInstaller.install(ckanConfig.extensions, command.install_dir);
            break;
        case 'ckan':
            var ckanInstaller = require('./lib/install/ckan');
            ckanInstaller.install(command.ckan_version, command.install_dir);
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
        switch (task) {
        case 'ckan':
            var ckanDownloader = require('./lib/download/ckan');
            ckanDownloader.download(command.ckan_version, command.install_dir);
            break;
        case 'extensions':
            var ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'config', 'ckanconfig.json');
            var ckanConfig = require(ckanconfigFile);
            var extensionDownloader = require('./lib/download/extensions');
            extensionDownloader.download(ckanConfig.extensions, command.install_dir);
            break;
        default:
            break;
        }
    });

program.parse(process.argv);
