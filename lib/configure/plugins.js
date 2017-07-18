const shell = require('shelljs');

class PluginsConfigurationManager {
    /**
     * Add all active Plugins to the given configuration file
     *
     * @param {array} plugins
     * @param {string} configurationFile
     */
    activateCkanPlugins (plugins, configurationFile) {
        let activePlugins = this.getActivePlugins(plugins).map(plugin => plugin.name).join(' ');
        shell.exec(`paster --plugin=ckan config-tool ${configurationFile} -e "ckan.plugins = ${activePlugins}"`);
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

module.exports = new PluginsConfigurationManager();
