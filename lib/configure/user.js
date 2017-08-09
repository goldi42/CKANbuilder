const pasterUtility = require('../utils/paster');
const logger = require('../logging/logService').getInstance();

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
        logger.info('upgrade user to sysadmin');
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
        logger.info('Add user: ' + username);
        pasterUtility.execute(`user add ${username} email=${email} password=${password}`, configurationFile);
    }
}

module.exports = UserConfigurationManager;
