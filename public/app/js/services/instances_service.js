angular.module('dendroIMApp.services')
    .service('instancesService',
                ['$http', '$localStorage', '$q',
        function ($http, $localStorage, $q) {

            this.get_all = function()
            {
                return $http({
                    method: 'GET',
                    url: '/instances',
                    contentType: "application/json",
                    headers: {'Accept': "application/json"}
                });
            };

            this.get_install_log = function(instance)
            {

            };

            this.tail_log = function(instance)
            {

            };

            this.save_all = function()
            {

            };

            this.get_template = function()
            {
                return $http({
                    method: 'GET',
                    url: '/app/schema/config_schema.json',
                    contentType: "application/json",
                    headers: {'Accept': "application/json"}
                });
            }
        }
    ]);

