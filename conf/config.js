/**
 * Configuration parameters
 */

function Config (){}

var fs = require('fs');
var path = require('path');
var appDir = path.dirname(require.main.filename);

var configs_file_path = path.join(appDir, "conf", "deployment_configs.json");
var active_config_file_path = path.join(appDir, "conf", "active_deployment_config.json");

var configs = JSON.parse(fs.readFileSync(configs_file_path, 'utf8'));
var active_config_key = JSON.parse(fs.readFileSync(active_config_file_path, 'utf8')).key;


var active_config = "";

for(var i = 0; i < configs.length; i++)
{
    if(configs[i].id === active_config_key)
    {
        active_config = configs[i];
    }
}

if(active_config === "")
{
    console.error("Unable to load active configuration " + active_config_key);
    process.exit(1)
}

var getConfigParameter = function(parameter)
{
    if(active_config[parameter] == null)
    {
        console.error("[FATAL ERROR] Unable to retrieve parameter " + parameter + " from \'"+active_config_key + "\' configuration. Please review the deployment_configs.json file.");
        process.exit(1);
    }
    else
    {
        return active_config[parameter];
    }
};

Config.baseUri = getConfigParameter("id");

//mongodb cluster used for file storage
Config.mongoDBHost =  getConfigParameter("mongoDBHost");
Config.mongoDbPort =  getConfigParameter("mongoDbPort");
Config.mongoDbCollectionName =  getConfigParameter("mongoDbCollectionName");
Config.mongoDbVersion =  getConfigParameter("mongoDbVersion");
Config.mongoDBAuth = getConfigParameter("mongoDBAuth");

Config.mongoDBConnectionString = 'mongodb://'+Config.mongoDBHost+'/'+Config.mongoDbCollectionName;

Config.administrators = getConfigParameter("administrators");

/**
 * Database connection (s).
 * @type {{default: {baseURI: string, graphName: string, graphUri: string}}}
 */

Config.absPathInProject = function(relativePath)
{
    var path = require('path'),
        appDir = path.dirname(require.main.filename);

    return path.join(appDir, relativePath);
};

Config.getPathToPublicFolder = function()
{
    return path.join(path.resolve(path.dirname(require.main.filename), '..'), "public");
};

Config.absPathInPublicFolder = function(relativePath)
{
    var path = require('path'),
        publicFolderPath = Config.getPathToPublicFolder();

    return path.join(publicFolderPath, relativePath);
};

module.exports.Config = Config;
