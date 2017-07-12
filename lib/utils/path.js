const path = require('path');
const fs = require('fs');
const fsextra = require('fs-extra');
const os = require('os');

class  PathUtil {

    /**
     * Get the path to a tempalte file
     * @param {string} templateFile
     */
    getTemplatePath (templateFile) {
        let template = path.join(__dirname, '..', '..', 'templates', templateFile);
        return path.normalize(template);
    }

    /**
     * Get all subdirectories of the given directory
     * @param {string} directory
     */
    getDirectories (directory) {
        return fs.readdirSync(directory).filter(file => fs.lstatSync(path.join(directory, file)).isDirectory());
    }

    /**
     * Get all files of the given directory
     * @param {string} directory
     */
    getFiles  (directory) {
        return fs.readdirSync(directory);
    }

    /**
     * Create a folder inside the os temp directory an add 6 random chars to it
     * e.q /temp/mytemp-123abc
     * @param {string} folderName
     */
    makeTempFolder (folderName) {
        return fs.mkdtempSync(path.join(os.tmpdir(), folderName + '-'));
    }

    /**
     * move a file or folder to the target
     * @param {string} source
     * @param {string} target
     */
    moveTo (source, target) {
        fsextra.copySync(source, target, {overwrite: true});
    }

    /**
     * delete all content from a directory
     * @param {string} directory
     */
    emptyDirectory (directory) {
        fsextra.emptyDirSync(directory);
    }

    /**
     * Get the component Directory
     * @param {string} componentName
     * @param {array} componentsConfigurations
     * @param {string} optionValue
     */
    getComponentDirectory (componentName, componentsConfigurations, optionValue) {
        let componentConf = componentsConfigurations.find(componentConf => componentConf.name === componentName);
        let componentDirectory;
        if (optionValue) {
            componentDirectory = (path.isAbsolute(optionValue))? optionValue : path.join(process.cwd(), optionValue);
        } else if (componentConf) {
            componentDirectory = (path.isAbsolute(componentConf.path))? componentConf.path : path.join(process.cwd(), componentConf.path);
        } else {
            switch (componentName) {
            case 'extensions':
                componentDirectory = path.join(process.cwd(), 'extensions');
                break;
            case 'vendor':
                componentDirectory = path.join(process.cwd(), 'vendor');
                break;

            default:
                break;
            }
        }
        return componentDirectory;
    }

}

module.exports = new PathUtil();
