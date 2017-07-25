const pasterUtility = require('../utils/paster');

class UserConfigurationManager {

    /**
     * Add a sysadmin user to ckan
     * @param {string} username
     * @param {string} password
     * @param {string} email
     * @param {string} configurationFile
     */
    addSysadminUser (username, password, email, configurationFile) {
        this.addUser(username,password,email,configurationFile);
        pasterUtility.execute(`sysadmin add ${username}`, configurationFile);
    }

    /**
     * Add an user user to ckan
     * @param {string} username
     * @param {string} password
     * @param {string} email
     * @param {string} configurationFile
     */
    addUser (username, password, email, configurationFile) {
        pasterUtility.execute(`user add ${username} email=${email} password=${password}`, configurationFile);
    }

    /**
     * Get the prompt field
     * @returns {array}
     */
    getPromptFields () {
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

module.exports = new UserConfigurationManager();
