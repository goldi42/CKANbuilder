const pathUtil = require('../utils/path');
const shell = require('shelljs');
const path = require('path');
const logger = require('../logging/logService').getInstance();

class AssetsBuilder {

    /**
     * Start the asset build for all extensions
     * @param {array} extensions
     * @param {string} extensionDir
     */
    static build (extensions, extensionDir) {
        let extensionFolders = pathUtil.getDirectories(extensionDir);
        extensionFolders.forEach(function(folder) {
            let extension = extensions.find( e => e.name === folder);
            logger.info(`Start building Assets for ${extension.name}`);
            if(extension.build_asset) {
                let fullExtensionPath = path.join(extensionDir, folder);
                let dependencyInstallationResults = shell.exec(
                    'npm install',
                    {
                        cwd: fullExtensionPath,
                        silent: true
                    }
                );
                if (dependencyInstallationResults.code > 0) {
                    logger.error('Error by installing assets dependencies');
                    logger.error('Details:' + dependencyInstallationResults.stderr);
                }
                logger.verbose('Assets dependencies installation Details: ' + dependencyInstallationResults.stdout);

                let assetBuildResults = shell.exec(
                    'npm run build',
                    {
                        cwd: fullExtensionPath,
                        silent: true
                    }
                );
                if (assetBuildResults === 0) {
                    logger.info('Assets build successful');
                } else {
                    logger.error('Assets build failed');
                    logger.error('Details: ' + assetBuildResults.stderr);
                }
                logger.verbose('Asset build details: ' + assetBuildResults.stdout);
            }
        }, this);
    }
}

module.exports = AssetsBuilder;
