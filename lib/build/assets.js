const pathUtil = require('../utils/path');
const shell = require('shelljs');
const path = require('path');

class AssetsBuilder {

    /**
     * Start the asset build for all extensions
     * @param {array} extensions
     * @param {string} extensionDir
     */
    build (extensions, extensionDir) {
        let extensionFolders = pathUtil.getDirectories(extensionDir);
        extensionFolders.forEach(function(folder) {
            let extension = extensions.find( e => e.name === folder);
            if(extension.build_asset) {
                let fullExtensionPath = path.join(extensionDir, folder);
                shell.exec(
                    'npm install',
                    {
                        cwd: fullExtensionPath
                    }
                );
                shell.exec(
                    'npm run build',
                    {
                        cwd: fullExtensionPath
                    }
                );
            }
        }, this);
    }
}

module.exports = new AssetsBuilder();
