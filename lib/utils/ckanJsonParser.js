let instance = null;
const path = require('path');
const fs = require('fs');
const LogService = require('../logging/logService');

class CkanJsonParser {

    /**
     * default constructor
     */
    constructor () {

        this._ckanJsonFilName = 'ckan.json';
        this._ckanJsonLegacyFileName = 'ckanconfig.json';
        this._directory = '';
        this._ckanJson = null;

        if (instance === null) {
            instance = this;
        }

        return instance;
    }

    /**
     * get Instance
     * @returns {CkanJsonParser}
     */
    static getInstance () {
        if (instance === null) {
            instance = new CkanJsonParser();
        }

        return instance;
    }

    /**
     * get the ckan config json
     * @return {Object}
     */
    get ckanJson () {
        if(this._ckanJson === null) {
            this.parseCkanJson();
        }
        return this._ckanJson;
    }

    /**
     * get the ckan extensions configuration
     * @returns {Array}
     */
    get extensions () {
        if(this._ckanJson === null) {
            this.parseCkanJson();
        }
        return this._ckanJson.extensions;
    }

    /**
     * get the ckan json component configuration
     * @returns {Array}
     */
    get components () {
        if(this._ckanJson === null) {
            this.parseCkanJson();
        }
        return this._ckanJson.components;
    }

    /**
     * set the directory for the ckan json file
     * @param {string} directory
     */
    set directory (directory) {
        this._directory= directory;
    }

    /**
     * parse the ckan json file
     */
    parseCkanJson () {
        let basePath =  path.join(process.cwd(), this._directory);
        let fullFilePath = path.join(basePath, this._ckanJsonFilName);
        if(!fs.existsSync(fullFilePath)) {
            fullFilePath = path.join(basePath, this._ckanJsonLegacyFileName);
            if(!fs.existsSync(fullFilePath)) {
                this._getLogger().warn('Legacy file not found, too! Please create a ckan.json File!');
            } else {
                this._getLogger().warn('Legacy file found. Please rename this file to ckan.json!');
            }
        }
        try {
            this._ckanJson = require(fullFilePath);
        } catch (error) {
            this._getLogger().error('Error by Parsing ckan json, see error Message: \n ' + error);
        }
    }

    /**
     * get the logger
     * @private
     * @returns {Object}
     */
    _getLogger () {
        return LogService.getInstance().logger;
    }
}

module.exports = CkanJsonParser;
