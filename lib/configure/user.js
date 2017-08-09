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
        logger.info('Upgrade user to sysadmin');
        let success = pasterUtility.execute(`sysadmin add ${username}`, configurationFile);
        if (success) {
            logger.info('User is now sysadmin');
        } else {
            logger.error('Failed to upgrade user as sysadmin');
        }
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
        let success = pasterUtility.execute(`user add ${username} email=${email} password=${password}`, configurationFile);
        if (success) {
            logger.info('User created');
        } else {
            logger.error('User could not created');
        }
    }
}

module.exports = UserConfigurationManager;
