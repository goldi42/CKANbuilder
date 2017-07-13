const templateService = require('../template/service');
const fs = require('fs');

class CkanConfigInitializer {

    constructor() {
        this._ckanConfigFileName = 'ckanconfig.json';
    }

    /**
     * initialize a default ckanconfig.json
     */
    init () {
        let content = templateService.render('ckanconfig.json');
        fs.writeFileSync(this._ckanConfigFileName, content, 'utf8');
    }
}

module.exports = new CkanConfigInitializer();
