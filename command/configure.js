const AbstractCommand = require('./abstractCommand');
const UserConfigurationManager = require('../lib/configure/user');
const PluginConfigurationManager = require('../lib/configure/plugins');
const inquirer = require('inquirer');

class ConfigureCommand extends AbstractCommand {

    constructor (task, commandOptions, ckanJson) {
        super(task, commandOptions, ckanJson);
        this.ckanini = commandOptions.configini_file;
    }

    /**
     *
     */
    exec () {
        switch (this.task) {
        case 'plugins': {
            let pluginConfigurationManager = new PluginConfigurationManager();
            pluginConfigurationManager.activateCkanPlugins(this.ckanJson.config.plugins, this.ckanini);
            break;
        }
        case 'sysadmin': {

            inquirer.prompt(this.getInputConfiguration()).then( answers => {
                UserConfigurationManager.addSysadminUser(answers.username, answers.password, answers.email, this.ckanini);
            });
            break;
        }
        case 'user': {
            inquirer.prompt(this.getInputConfiguration()).then( answers => {
                UserConfigurationManager.addUser(answers.username, answers.password, answers.email, this.ckanini);
            });
            break;
        }
        default:
            break;
        }
    }

    /**
     * Get the prompt field
     * @returns {array}
     */
    getInputConfiguration () {
        return [
            {
                type: 'input',
                name: 'username',
                message: 'Please enter a username:'
            },
            {
                type: 'input',
                name: 'email',
                message: 'Please enter an email'
            },
            {
                type: 'password',
                name: 'password',
                message: 'Please enter a password'
            }
        ];
    }
}

module.exports = ConfigureCommand;
