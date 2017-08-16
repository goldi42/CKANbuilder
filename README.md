# ckan_builder

A small build tool to install and configure your CKAN project

## ckan.json

The ckan.json file is the important file for the ckan_builder. Inside the file you can descide witch CKAN version you want to use and what extensions you want to install and what plugins you want to activate.

## Available Commands

### global obtions
`-c, --ckanconfig_path [path]`  Path to Ckan.json File with ckan config

`-v, --verbose` set the console output to verbose

`-h, --help` output usage information

`-l, --file_log` activate the filelog

`-V, --version` output the version number

### build
With `build assets` command you can start the build process for the assetes of your extension. At the monent you must place a `package.json` file to your extension root directory an define a build task. You can install dependencies via NPM.

* Examples:

Command call: `ckanbuilder build asstes`

package.json inside an extension:
```
{test}
```

### install
With the install command you can install CKAN or extensions, which are defined in the `ckan.json`

* Available Tasks:
    * `ckan`: Install CKAN
    * `extensions`: Install Extensions
* Options:
    * `-d, --install_dir [path]` directory to installation CKAN or Extensions
    * `-i, --ckan_version [version]`  define the CKAN version which should be installed
* Examples:
    * Install CKAN:
    * Install Extensions:

### download
With the donwload command you can donwload CKAN or extensions to your local file system. All extensions which are defined in the `ckan.json` will be downloaded

* Available Tasks:
    * `ckan`: Download CKAN
    * `extensions`: Download all Extensions
* Options:
    * `-d, --install_dir [path]` directory to installation CKAN or Extensions
    * `-i, --ckan_version [version]`  define the CKAN version which should be installed

### configure

With this configure command you can create user or sysadmins or update the plugin list of your CKAN configuration. If you create a user or sysadmin you will be ask about username, email and password

* Available Tasks:
    * `plugins`: Add the plugins, which are defined in the `ckan.json` to your CKAN config
    * `user`: create a normal user
    * `sysadmin`: create a sysadmin user
* Options:
    * `i, --configini_file <file>`  the CKAN config file, e.q. `config/develop.ini`
* Examples:
    * create a user: `ckanbuilder configure sysadmin --configini_file config/develop.ini`

### generate

With this command you can generate a default `ckan.json`

* Available Tasks:
    * `ckanjson`: Generate a default `ckan.json` in the current folder
* Examples:
    * `ckanbuilder generate ckanjson`
