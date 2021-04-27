const shell = require('shelljs');
const logger = require('../logging/logService').getInstance();

class PluginsConfigurationManager {
    /**
     * Add all active Plugins to the given configuration file
     *
     * @param {array} plugins
     * @param {string} configurationFile
     */
    activateCkanPlugins (plugins, configurationFile) {
        let activePlugins = this.getActivePlugins(plugins).map(plugin => plugin.name).join(' ');
        logger.info(`Activate the plugins ${activePlugins} for configuration ${configurationFile}`);
        let success = shell.exec(`ckan config-tool ${configurationFile} -e "ckan.plugins = ${activePlugins}"`);
        if (success.code === 0) {
            logger.info('Plugin activation successful');
        } else {
            logger.error('Plugin activation failed');
        }
    }

    /**
     * Get all active Plugins
     *
     * @param {array} plugins
     * @returns {array}
     */
    getActivePlugins (plugins) {
        return plugins.filter(plugin => plugin.active);
    }
}

module.exports = PluginsConfigurationManager;
