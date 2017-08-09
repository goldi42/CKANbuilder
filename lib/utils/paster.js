const shell = require('shelljs');

class PasterUtility {

    /**
     * execute a paster command
     * @param {string} command
     * @param {string} configurationFile
     * @returns {boolean}
     */
    execute (command, configurationFile = null) {
        let result = false;
        let execCommand = `paster --plugin=ckan ${command}`;
        if (configurationFile) {
            execCommand = execCommand + ` -c ${configurationFile}`;
        }
        let pasterResult = shell.exec(execCommand, {silent: true});
        if (pasterResult.code === 0) {
            result = true;
        }
        return result;
    }
}

module.exports = new PasterUtility();
