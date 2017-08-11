const templateService = require('../template/service');
const fs = require('fs');

class CkanConfigInitializer {

    constructor() {
        this._ckanConfigFileName = 'ckan.json';
    }

    /**
     * initialize a default ckan.json
     */
    init () {
        let content = templateService.render('ckan.json');
        fs.writeFileSync(this._ckanConfigFileName, content, 'utf8');
    }
}

module.exports = CkanConfigInitializer;
