const path = require('path');

var PathUtil = () => {}

/**
 * Get the path to a tempalte file
 * @param {string} templateFile
 */
PathUtil.prototype.getTemplatePath = (templateFile) => {
    template = path.join(__dirname, '..', '..', 'templates', templateFile);
    return path.normalize(template);
}
module.exports = new PathUtil();
