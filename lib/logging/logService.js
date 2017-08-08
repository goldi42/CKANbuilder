const winston = require('winston');
const path = require('path');
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
            if (filelogConfiugration.directory) {
                let directory = '';
                directory = path.join(process.cwd(), filelogConfiugration.directory);
            }
            this._logger.add(winston.transports.File, {filename: filelogConfiugration.filename, dirname: directory});
        }
    }
}

module.exports = LogService;
