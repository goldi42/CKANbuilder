const path = require('path');
var program = require('commander');

program
    .version('0.0.1')
    .description('ckan build tool for common tasks');

program
    .command('build <task>')
    .description('build operations')
    .option('-j, --json_file [file]','JSON File with ckan extensions')
    .option('-o, --output [path]', 'Path where the results wood save')
    .action((task, command) => {
        switch (task) {
        case 'requirements':
            var jsonfile = (command.json_file)? command.json_file : path.join(process.cwd(), 'config', 'extensions.json');
            var outputPath = (command.output)? command.output : path.join(process.cwd(), 'extensions');
            var requirementsFileBuilder = require('./lib/build/requirementsFile');
            requirementsFileBuilder.build(jsonfile, outputPath);
            break;

        default:
            break;
        }
    });
program
    .command('install <task>')
    .description('install ckan or all extensions for ckan. Valid tasks are \'ckan\' and \'extensions\' ')
    .option('-j, --json_file [file]','JSON File with ckan extensions', path.join(process.cwd(), 'config', 'extensions.json'))
    .option('-i, --install_dir [path]','directory for installation', path.join(process.cwd(), 'extension'))
    .option('-c, --ckan_version [version]', 'ckan version which should be installed', '2.5.5')
    .action( (task, command) => {
        switch (task) {
        case 'extensions':
            var extensionInstaller = require('./lib/install/extensions');
            extensionInstaller.install(command.json_file, command.install_dir);
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
    .option('-j, --json_file [file]','JSON File with ckan extensions', path.join(process.cwd(), 'config', 'extensions.json'))
    .option('-i, --install_dir [path]','directory for installation', path.join(process.cwd(), 'extension'))
    .option('-c, --ckan_version [version]', 'ckan version which should be installed', '2.5.5')
    .action( (task, command) => {
        switch (task) {
        case 'ckan':
            var ckanDownloader = require('./lib/download/ckan');
            ckanDownloader.download(command.ckan_version, command.install_dir);
            break;
        case 'extensions':
            var extensionDownloader = require('./lib/download/extensions');
            extensionDownloader.download(command.json_file,command.install_dir);
            break;
        default:
            break;
        }
    });

program.parse(process.argv);
