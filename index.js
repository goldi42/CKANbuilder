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

program.parse(process.argv);
