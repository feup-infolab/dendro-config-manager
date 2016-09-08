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
                    data: JSON.stringify({}),
                    headers: {'Accept': "application/json"}
                });
            };

            this.get_install_log = function(instance)
            {

            };

            this.tail_log = function(instance)
            {

            };

            this.create_new = function(instance)
            {
                return $http({
                    method: 'POST',
                    url: '/instances/new',
                    contentType: "application/json",
                    data: JSON.stringify(instance),
                    headers: {'Accept': "application/json"}
                });
            };

            this.save = function(instance, instance_id)
            {
                return $http({
                    method: 'POST',
                    url: '/instances/' + instance_id,
                    contentType: "application/json",
                    data: JSON.stringify(instance),
                    headers: {'Accept': "application/json"}
                });
            };

            this.get_template = function()
            {
                return $http({
                    method: 'GET',
                    url: '/app/schema/template.json',
                    contentType: "application/json",
                    data: JSON.stringify({}),
                    headers: {'Accept': "application/json"}
                });
            };

            this.get_schema = function()
            {
                return $http({
                    method: 'GET',
                    url: '/app/schema/config_schema.json',
                    contentType: "application/json",
                    data: JSON.stringify({}),
                    headers: {'Accept': "application/json"}
                });
            }
        }
    ]);

