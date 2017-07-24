const pasterUtility = require('../utils/paster');

class UserConfigurationManager {

    /**
     * Add an sysadmin user to ckan
     * @param {string} username
     * @param {string} password
     * @param {string} configurationFile
     */
    addSysadminUser (username, password, configurationFile) {
        pasterUtility.execute(`sysadmin add ${username} -c ${configurationFile}`);
    }
}

module.exports = new UserConfigurationManager();
