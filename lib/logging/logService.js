const winston = require('winston');
const CkanJsonParser = require('../utils/ckanJsonParser');
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
        let directory = '';
        let filelogConfiugration = CkanJsonParser.getInstance().ckanJson.filelog;

        if (filelogConfiugration){
            if (filelogConfiugration.directory) {
                directory = path.join(process.cwd(), filelogConfiugration.directory);
            }
            this._logger.add(winston.transports.File, {filename: filelogConfiugration.filename, dirname: directory});
        }

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
}

module.exports = LogService;
