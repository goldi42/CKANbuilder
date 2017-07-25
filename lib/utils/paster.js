const shell = require('shelljs');

class PasterUtility {

    /**
     * execute a paster command
     * @param {string} command
     * @param {string} configurationFile
     */
    execute (command, configurationFile = null) {
        let execCommand = `paster --plugin=ckan ${command}`;
        if (configurationFile) {
            execCommand = execCommand + ` -c ${configurationFile}`;
        }
        shell.exec(execCommand);
    }
}

module.exports = new PasterUtility();
