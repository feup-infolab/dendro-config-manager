var mongoose = require('mongoose');
var Config = require("../conf/config.js").Config;

mongoose.connect(Config.mongoDBConnectionString);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var instance_schema = new Schema(
    {
        "id" : String,
        "vm" : Boolean,
        "port": Number,
        "host": String,
        "baseUri": String,
        "eudatBaseUrl": String,
        "eudatToken": String,
        "sendGridUser": String,
        "sendGridPassword": String,
        "elasticSearchHost": String,
        "elasticSearchPort": String,
        "cache": {
            "active": Boolean,
            "redis": {
                "options": {
                    "host": String,
                    "port": String
                },
                "database_number": Number
            },
            "static": {
                "thumbnails_timeout_in_seconds": Number,
                "cache_static_files": Boolean,
                "files_timeout_in_seconds": Number
            }
        },
        "virtuosoHost": String,
        "virtuosoPort": String,
        "virtuosoAuth": {
            "user": String,
            "password": String
        },
        "mongoDBHost": String,
        "mongoDbPort": String,
        "mongoDbCollectionName": String,
        "mongoDbVersion": String,
        "mongoDBAuth": {
            "user": String,
            "password": String
        },
        "mySQLHost": String,
        "mySQLPort": String,
        "mySQLAuth": {
            "user": String,
            "password": String
        },
        "mySQLDBName": String,
        "maxUploadSize": Number,
        "maxProjectSize": Number,
        "maxSimultanousConnectionsToDb": Number,
        "dbOperationTimeout": Number,
        "tempFilesDir": String,
        "tempFilesCreationMode": String,
        "administrators": [
            {
                "username": String,
                "password": String,
                "firstname": String,
                "surname": String,
                "mbox": String
            }
        ],
        "demo_mode": {
            "active": Boolean,
            "users": [
                {
                    "username": String,
                    "password": String,
                    "firstname": String,
                    "surname": String,
                    "mbox": String
                }
            ]
        },
        "useElasticSearchAuth": Boolean,
        "elasticSearchAuthCredentials": {
            "username": String,
            "password": String
        },
        "systemOrHiddenFilesRegexes": [String],
        "theme": String,
        "debug": {
            "active": Boolean,
            "database": {
                "log_all_queries": Boolean
            },
            "session": {
                "auto_login": Boolean,
                "login_user": String
            },
            "files": {
                "log_all_restore_operations": Boolean,
                "log_delete_operations": Boolean,
                "log_file_fetches": Boolean
            },
            "resources": {
                "log_all_type_checks": Boolean
            },
            "permissions": {
                "enable_permissions_system": Boolean,
                "log_authorizations": Boolean,
                "log_denials": Boolean,
                "log_requests_and_permissions": Boolean
            },
            "users": {
                "log_fetch_by_username": Boolean
            },
            "descriptors": {
                "log_missing_unknown_descriptors": Boolean,
                "log_unknown_types": Boolean
            },
            "ontologies": {
                "log_autocomplete_requests": Boolean
            },
            "views": {
                "show_all_buttons_in_recommendations": Boolean,
                "prefill_text_boxes": Boolean
            },
            "cache": {
                "log_cache_hits": Boolean,
                "log_cache_writes": Boolean,
                "log_cache_deletes": Boolean
            },
            "diagnostics": {
                "ram_usage_report": Boolean
            }
        },
        "startup": {
            "reload_administrators_on_startup": Boolean,
            "reload_demo_users_on_startup": Boolean,
            "reload_ontologies_on_startup": Boolean
        },
        "baselines": {
            "dublin_core_only": Boolean
        },
        "logging": {
            "config": Boolean
        },
        "version": {
            "number": Number,
            "name": String
        },
        "recommendation": {
            "modes": {
                "dendro_recommender": {
                    "active": Boolean,
                    "host": String,
                    "port": String,
                    "log_modes": {
                        "phase_1": {
                            "table_to_write_interactions": String,
                            "active": Boolean
                        },
                        "phase_2": {
                            "table_to_write_interactions": String,
                            "active": Boolean
                        }
                    }
                },
                "standalone": {
                    "active": Boolean
                },
                "none": {
                    "active": Boolean
                }
            },
            "max_autocomplete_results": Number,
            "max_suggestions_of_each_type": Number,
            "recommendation_page_size": Number,
            "random_interactions_generation_page_size": Number,
            "max_interaction_pushing_threads": Number
        },
        "email": {
            "gmail": {
                "username": String,
                "password": String
            }
        },
        "maps": {
            "gmaps_api_key": String,
            "map_height": Number
        },
        "change_log": {
            "default_page_length": Number
        }
    }
);

var Instance = mongoose.model('Instance', instance_schema);

Instance.prototype.install = function(callback)
{

};

module.exports.Instance = Instance;