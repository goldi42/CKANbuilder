const fs = require('fs');
const path = require('path');
const templateService = require('../template/service');

var RequirementsFileBuilder = function() {};

/**
 * build the requirements.txt file for ckan extensions and pythonlibs
 * @param {array} extensions
 * @param {string} destination
 */
RequirementsFileBuilder.prototype.build = (extensions, destination) => {
    var requirementsFilename = path.join(destination, 'requirements.txt');
    var data = {
        'extensions': extensions
    };
    var content = templateService.render('requirements.txt', data);

    fs.writeFileSync(requirementsFilename, content, 'utf8');
};

module.exports = new RequirementsFileBuilder();
