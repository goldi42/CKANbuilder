const fs = require('fs');
const path = require('path');
const templateService = require('../template/service');

var RequirementsFileBuilder = function() {};

/**
 * build the requirements.txt file for ckan extensions and pythonlibs
 * @param {string} jsonFile
 * @param {string} destination
 */
RequirementsFileBuilder.prototype.build = (jsonFile, destination) => {
    var requirementsFilename = path.join(destination, 'requirements.txt');
    var extensionsJson = require(jsonFile);
    var content = templateService.render('requirements.txt',extensionsJson);

    fs.writeFileSync(requirementsFilename, content, 'utf8');
};

module.exports = new RequirementsFileBuilder();
