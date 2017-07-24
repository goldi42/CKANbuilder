const shell = require('shelljs');

class PasterUtility {

    /**
     * execute a paster command
     * @param {string} command
     */
    execute (command) {
        shell.exec(`paster --plugin=ckan ${command}`);
    }
}

module.exports = new PasterUtility();
