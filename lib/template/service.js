const handlebars = require('handlebars');
const pathUtility = require('../utils/path');
const conditionsHelper = require('./helper/conditions');
const fs = require('fs');

var TemplateService = function () {};

TemplateService.prototype.render = (templateName, data) => {
    var templateFile = pathUtility.getTemplatePath(templateName + '.hbs');
    var template = fs.readFileSync(templateFile, 'utf8');
    handlebars.registerHelper(conditionsHelper);
    template = handlebars.compile(template);
    return template(data);
};

module.exports = new TemplateService();
