# CKANbuilder

A small build tool to install and configure your CKAN project

## ckan.json

The ckan.json file is the important file for the CKANbuilder. Inside the file you can descide witch CKAN version you want to use and what extensions you want to install and what plugins you want to activate.

* Example:

```
{
    "ckan": {
        "version": "2.7.0"
    },
    "components": [
        {"name": "extensions", "path": "./extensions"},
        {"name": "vendor", "path": "./vendor"},
        {"name": "logs", "path": "./logs/"}
    ],
    "config": {
        "plugins": [
            {"name": "stats", "active":true},
            {"name": "text_view", "active":true},
            {"name": "image_view", "active":true},
            {"name": "recline_view", "active":true}
        ]
    },
    "extensions": [
        {"name": "Local Extension", "version": "1.0.0", "type": "Local", "path": "./", "build_asset": true},
        {"name": "VCS Extension", "version": "master", "type": "VCS", "repository": "git+https://github.com/myacc/myrepo/"},
        {"name": "PyPI Extension", "version": "1.0.0", "type": "PyPI"}
    ],
    "filelog": {
        "filename": "ckanbuilder.log"
    }
}

```

* Description:

```
 "ckan": {
        "version": "2.7.0"
    }
```

The CKAN Version which should be installed. You can install each version which is available via github.


```
"components": [
        {"name": "extensions", "path": "./extensions"},
        {"name": "vendor", "path": "./vendor"},
        {"name": "logs", "path": "./logs/"}
    ]
```

The directories where CKAN, extensions or other commponents should be installed and where the logs should be written.


```
 "extensions": [
        {"name": "Local Extension", "version": "1.0.0", "type": "Local", "path": "./", "build_asset": true},
        {"name": "VCS Extension", "version": "master", "type": "VCS", "repository": "git+https://github.com/myacc/myrepo/"},
        {"name": "PyPI Extension", "version": "1.0.0", "type": "PyPI"}
    ],
```

The list of extensions which shloud be installed. You can install local extensions. Extensions from an VCS like git or via PyPi. If you install an extension via git, you can install every tag or branch by settting the name inside the version value.
You can configure if the assetes of the extension shloud be build via CKANbuilder.

```
"filelog": {
        "filename": "ckanbuilder.log"
    }
```

Defines the filename of the CKANbuilder log

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
