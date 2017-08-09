const shell = require('shelljs');
const logger = require('../logging/logService').getInstance();

class PasterUtility {

    /**
     * execute a paster command
     * @param {string} command
     * @param {string} configurationFile
     * @returns {boolean}
     */
    execute (command, configurationFile = null) {
        let result = true;
        let execCommand = `paster --plugin=ckan ${command}`;
        if (configurationFile) {
            execCommand = execCommand + ` -c ${configurationFile}`;
        }
        let pasterResult = shell.exec(execCommand, {silent: true});
        if (pasterResult.code > 0) {
            result = false;
            logger.error('Paster command failed: ' + pasterResult.stderr);
        }
        return result;
    }
}

module.exports = new PasterUtility();
