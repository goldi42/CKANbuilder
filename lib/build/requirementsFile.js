const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');
const pathUtility = require('../utils/path');

var RequirementsFileBuilder = function() {};

/**
 * build the requirements.txt file for ckan extensions and pythonlibs
 * @param {string} jsonFile
 * @param {string} destination
 */
RequirementsFileBuilder.prototype.build = (jsonFile, destination) => {
    var templateFile = pathUtility.getTemplatePath('requirements.txt.hbs');

    var requirementsFilename = path.join(destination, 'requirements.txt');

    var extensionsJson = require(jsonFile);

    var requirementsTemplate = fs.readFileSync(templateFile, 'utf8');
    requirementsTemplate = handlebars.compile(requirementsTemplate);
    var content = requirementsTemplate(extensionsJson);

    fs.writeFileSync(requirementsFilename, content, 'utf8');
};

module.exports = new RequirementsFileBuilder();
