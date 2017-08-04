const pasterUtility = require('../utils/paster');

class UserConfigurationManager {

    /**
     * Add a sysadmin user to ckan
     * @param {string} username
     * @param {string} password
     * @param {string} email
     * @param {string} configurationFile
     */
    static addSysadminUser (username, password, email, configurationFile) {
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
    static addUser (username, password, email, configurationFile) {
        pasterUtility.execute(`user add ${username} email=${email} password=${password}`, configurationFile);
    }
}

module.exports = UserConfigurationManager;
