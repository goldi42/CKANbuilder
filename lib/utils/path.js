const path = require('path');
const fs = require('fs');
const fsextra = require('fs-extra');
const os = require('os');

var PathUtil = function() {};

/**
 * Get the path to a tempalte file
 * @param {string} templateFile
 */
PathUtil.prototype.getTemplatePath = (templateFile) => {
    var template = path.join(__dirname, '..', '..', 'templates', templateFile);
    return path.normalize(template);
};

/**
 * Get all subdirectories of the given directory
 * @param {string} directory
 */
PathUtil.prototype.getDirectories = (directory) => {
    return fs.readdirSync(directory).filter(file => fs.lstatSync(path.join(directory, file)).isDirectory());
};

/**
 * Get all files of the given directory
 * @param {string} directory
 */
PathUtil.prototype.getFiles = (directory) => {
    return fs.readdirSync(directory);
};

/**
 * Create a folder inside the os temp directory an add 6 random chars to it
 * e.q /temp/mytemp-123abc
 * @param {string} folderName
 */
PathUtil.prototype.makeTempFolder = (folderName) => {
    return fs.mkdtempSync(path.join(os.tmpdir(), folderName + '-'));
};

/**
 * move a file or folder to the target
 * @param {string} source
 * @param {string} target
 */
PathUtil.prototype.moveTo = (source, target) => {
    fsextra.copySync(source, target, {overwrite: true});
};

/**
 * delete all content from a directory
 * @param {string} directory
 */
PathUtil.prototype.emptyDirectory = (directory) => {
    fsextra.emptyDirSync(directory);
};

module.exports = new PathUtil();
