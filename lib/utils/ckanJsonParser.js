let instance = null;
const path = require('path');
const fs = require('fs');

class CkanJsonParser {

    /**
     * default constructor
     */
    constructor () {

        this._ckanJsonFilName = 'ckan.json';
        this._ckanJsonLegacyFileName = 'ckanconfig.json';
        this._directory = null;
        this._ckanJson = null;

        if (!instance) {
            instance = this;
        }

        return instance;
    }

    /**
     * get Instance
     * @returns {CkanJsonParser}
     */
    static getInstance () {
        if (!instance) {
            instance = new CkanJsonParser();
        }

        return instance;
    }

    /**
     * get the ckan config json
     * @return {Array}
     */
    get ckanJson () {
        if(!this._ckanJson) {
            this.parseCkanJson();
        }
        return this._ckanJson;
    }

    /**
     * get the ckan extensions configuration
     * @returns {Array}
     */
    get extensions () {
        if(!this._ckanJson) {
            this.parseCkanJson();
        }
        return this._ckanJson.extensions;
    }

    /**
     * get the ckan json component configuration
     * @returns {Array}
     */
    get components () {
        if(!this._ckanJson) {
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

    parseCkanJson () {
        let basePath =  path.join(process.cwd(), this._directory);
        let fullFilePath = path.join(basePath, this._ckanJsonFilName);
        if(!fs.existsSync(fullFilePath)) {
            fullFilePath = path.join(basePath, this._ckanJsonLegacyFileName);
            if(!fs.existsSync(fullFilePath)) {
                console.log('Legacy file not found, too! Please create a ckan.json File!');
            } else {
                console.log('Legacy file found. Please rename this file to ckan.json!');
            }
        }
        try {
            this._ckanJson = require(fullFilePath);
        } catch (error) {
            console.log('Error by Parsing ckan json, see error Message: \n ' + error);
        }
    }
}

module.exports = CkanJsonParser;
