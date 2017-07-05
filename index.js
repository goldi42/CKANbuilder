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
        var ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'config', 'ckanconfig.json');
        var ckanConfig = require(ckanconfigFile);

        switch (task) {
        case 'requirements':
            var requirementsFileBuilder = require('./lib/build/requirementsFile');
            requirementsFileBuilder.build(ckanConfig.extensions, (command.output)? command.output : determineDefaultFolder(task, ckanConfig.components, path.join(process.cwd(), 'extensions')));
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
        var ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'config', 'ckanconfig.json');
        var ckanConfig = require(ckanconfigFile);
        switch (task) {
        case 'extensions':
            var extensionInstaller = require('./lib/install/extensions');
            extensionInstaller.install(ckanConfig.extensions, (command.install_dir)? command.install_dir : determineDefaultFolder(task, ckanConfig.components, path.join(process.cwd(), 'extensions')));
            break;
        case 'ckan':
            var ckan_version = (command.ckan_version)? command.ckan_version : ckanConfig.ckan.version;
            var ckanInstaller = require('./lib/install/ckan');
            ckanInstaller.install(ckan_version, (command.install_dir)? command.install_dir : determineDefaultFolder(task, ckanConfig.components, path.join(process.cwd(), 'vendor')));
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
        var ckanconfigFile = (command.ckanconfig_file)? command.ckanconfig_file : path.join(process.cwd(), 'config', 'ckanconfig.json');
        var ckanConfig = require(ckanconfigFile);

        switch (task) {
        case 'ckan':
            var ckanDownloader = require('./lib/download/ckan');
            ckanDownloader.download(command.ckan_version, (command.install_dir)? command.install_dir : determineDefaultFolder(task, ckanConfig.components, path.join(process.cwd(), 'vendor')));
            break;
        case 'extensions':
            var extensionDownloader = require('./lib/download/extensions');
            extensionDownloader.download(ckanConfig.extensions, (command.install_dir)? command.install_dir : determineDefaultFolder(task, ckanConfig.components, path.join(process.cwd(), 'extensions')));
            break;
        default:
            break;
        }
    });

function determineDefaultFolder(command, components, defaultPath) {
    var commandPath = defaultPath;
    components.forEach(function(component) {
        if (component.name === command) {
            commandPath = path.join(process.cwd(), component.path);
        }
    }, this);
    return commandPath;
}

program.parse(process.argv);
