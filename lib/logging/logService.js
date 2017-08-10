const winston = require('winston');
const path = require('path');
const fs = require('fs-extra');

let instance = null;

class LogService {

    /**
     * constructor returns singleton instance
     * @returns {LogService}
     */
    constructor () {
        this._logger = new winston.Logger({
            transports: [
                new (winston.transports.Console)({ colorize: 'all'}),
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
     * @param {string} logDirectory
     */
    initializeFileLog (filelogConfiugration, logDirectory) {
        if (filelogConfiugration){
            let directory = logDirectory;
            if (filelogConfiugration.directory) {
                directory = path.join(process.cwd(), filelogConfiugration.directory);
            }

            fs.ensureDirSync(directory);
            this._logger.add(winston.transports.File, {filename: filelogConfiugration.filename, dirname: directory});
        }
    }

    /**
     * log info message
     * @param {string} message
     */
    info (message) {
        this._logger.info(message);
    }

    warn (message) {
        this._logger.warn(message);
    }

    /**
     * log error message
     * @param {string} message
     */
    error (message) {
        this._logger.error(message);
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
