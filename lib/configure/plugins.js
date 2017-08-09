const pasterUtility = require('../utils/paster');
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
        logger.info(`Activate the plugins ${activePlugins} for configuraiton ${configurationFile}`);
        pasterUtility.execute(`config-tool ${configurationFile} -e "ckan.plugins = ${activePlugins}"`);
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
