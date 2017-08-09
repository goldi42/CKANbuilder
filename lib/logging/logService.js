const winston = require('winston');
const path = require('path');
const chalk = require('chalk');

let instance = null;

class LogService {

    /**
     * constructor returns singleton instance
     * @returns {LogService}
     */
    constructor () {
        this._logger = new winston.Logger({
            transports: [
                new (winston.transports.Console)({ colorize: true}),
            ]
        });
        this._logger.cli();

        if(instance === null) {
            instance = this;
        }
        return instance;
    }

    /**
     * get LogService Instance
     * @returns {LogService}
     */
    static getInstance () {
        if (instance === null) {
            instance = new LogService();
        }
        return instance;
    }

    /**
     * get the logger
     * @returns {winston.Logger}
     */
    get logger () {
        return this._logger;
    }

    /**
     * Initialize FileLog
     * @param {Object} filelogConfiugration
     */
    initializeFileLog (filelogConfiugration = null) {
        if (filelogConfiugration){
            let directory = '';
            if (filelogConfiugration.directory) {
                directory = path.join(process.cwd(), filelogConfiugration.directory);
            }
            this._logger.add(winston.transports.File, {filename: filelogConfiugration.filename, dirname: directory});
        }
    }

    /**
     * log info message
     * @param {string} message
     */
    info (message) {
        this._logger.info(chalk.green(message));
    }

    warn (message) {
        this._logger.warn(chalk.yellow(message));
    }

    /**
     * log error message
     * @param {string} message
     */
    error (message) {
        this._logger.error(chalk.red(message));
    }

    /**
     * log verbose message
     * @param {string} message
     */
    verbose (message) {
        this._logger.log('verbose', message);
    }
}

module.exports = LogService;
