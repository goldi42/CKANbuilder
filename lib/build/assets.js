const pathUtil = require('../utils/path');
const childProcess = require('child_process');
const path = require('path');
var AssetsBuilder = function () {};

/**
 * Start the asset build for all extensions
 * @param {array} extensions
 * @param {string} extensionDir
 */
AssetsBuilder.prototype.build = (extensions, extensionDir) => {
    var extensionFolders = pathUtil.getDirectories(extensionDir);
    extensionFolders.forEach(function(folder) {
        var extension = extensions.find( e => e.name === folder);
        if(extension.build_asset) {
            var fullExtensionPath = path.join(extensionDir, folder);
            childProcess.exec(
                'npm install',
                {
                    cwd: fullExtensionPath
                }
            );
            childProcess.exec(
                'npm run build',
                {
                    cwd: fullExtensionPath
                }
            );
        }
    }, this);
};
