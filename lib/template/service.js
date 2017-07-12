const handlebars = require('handlebars');
const pathUtility = require('../utils/path');
const conditionsHelper = require('./helper/conditions');
const fs = require('fs');

class TemplateService {

    render (templateName, data) {
        let templateFile = pathUtility.getTemplatePath(templateName + '.hbs');
        let template = fs.readFileSync(templateFile, 'utf8');
        handlebars.registerHelper(conditionsHelper);
        template = handlebars.compile(template);
        return template(data);
    }
}

module.exports = new TemplateService();
