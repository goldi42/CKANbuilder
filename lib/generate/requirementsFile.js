const fs = require('fs');
const path = require('path');
const templateService = require('../template/service');

class RequirementsFileBuilder {
    /**
     * build the requirements.txt file for ckan extensions and pythonlibs
     * @param {array} extensions
     * @param {string} destination
     */
    build (extensions, destination) {
        let requirementsFilename = path.join(destination, 'requirements.txt');
        let data = {
            'extensions': extensions
        };
        let content = templateService.render('requirements.txt', data);

        fs.writeFileSync(requirementsFilename, content, 'utf8');
    }
}

module.exports = new RequirementsFileBuilder();
