const handlebars = require('handlebars');
const pathUtility = require('../utils/path');
const ifcondHelper = require('./helper/ifcond');
const fs = require('fs');

var TemplateService = function () {};

TemplateService.prototype.render = (templateName, data) => {
    var templateFile = pathUtility.getTemplatePath(templateName + '.hbs');
    var template = fs.readFileSync(templateFile, 'utf8');
    handlebars.registerHelper(ifcondHelper.name,ifcondHelper.func);
    template = handlebars.compile(template);
    return template(data);
};

module.exports = new TemplateService();
