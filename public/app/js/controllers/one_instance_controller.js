angular.module('dendroIMApp.controllers')
    /*
     *  Window controller
     */
    .controller('oneInstanceCtrl', function (
        $scope,
        $http,
        $filter,
        $q,
        $log,
        $localStorage,
        $timeout,
        windowService,
        storageService,
        instancesService
    )
    {

        $scope.options_left = {
            "mode": "code",
            "modes": [
                "tree",
                "form",
                "code",
                "text"
            ],
            "history": false,
            "schema" : $scope.schema
        };

        $scope.options_right = {
            "mode": "tree",
            "modes": [
                "tree",
                "form",
                "code",
                "text"
            ],
            "history": false ,
            "schema" : $scope.schema
        };

        $scope.cancel = function()
        {
            window.location.href = '/instances';
        };

        $scope.editor_loaded = function(jsonEditor){
            if(jsonEditor.getMode() == "tree")
            {
                setTimeout(function()
                {
                    if(jsonEditor.expandAll != null)
                    {
                        if($scope.schema != null)
                        {
                            windowService.show_popup("success", "Data loaded", "Instance successfully loaded");

                            jsonEditor.expandAll();
                            jsonEditor.setSchema($scope.schema);
                        }
                        else
                        {
                            windowService.show_popup("error", "Error", "Error loading instance data");
                        }
                    }
                }, 1000);
            }
        };

        $scope.save = function(instance)
        {
            if($scope.instance_id)
            {
                instancesService.save(instance, $scope.instance_id)
                    .then(function (response)
                    {
                        windowService.show_popup("success", "OK", "Instance" + Object.keys(instance)[0] + " updated.");
                    })
                    .catch(function (error)
                    {
                        windowService.show_popup("error", "Error", "Unable to update instance" + Object.keys(instance)[0] + "." + error.data.message);
                    });
            }
            else
            {
                instancesService.create_new(instance)
                    .then(function(response){
                        windowService.show_popup("success", "OK", "Instance with id " + instance.id + " created. <br/><br> <a href='/instances'><h1>Go to list</h1></a>");
                    })
                    .catch(function(error)
                    {
                        windowService.show_popup("error", "Error", "Unable to create instance with id " + instance.id  + "." + error.data.message);
                    });
            }
        };

        $scope.is_valid_instance = function()
        {
            if($scope.new_instance == null || $scope.schema == null)
            {
                return false;
            }
            else
            {
                var valid = tv4.validate($scope.new_instance, $scope.schema);

                if(valid !== true)
                {
                    $scope.validation_errors = "Errors in the configuration"
                }
                else
                {
                    $scope.validation_errors = "Instance configuration OK!";
                }

                return valid;
            }

        };

        $scope.init = function(instance_id)
        {
            if(instance_id != null)
            {
                $scope.instance_id = instance_id;
            }

            async.series([
                function(callback)
                {
                    instancesService.get_template()
                        .then(function(response) {
                            $scope.instance_template = response.data;
                            $scope.new_instance = response.data;
                            callback(null, null);
                        }).catch(function(error) {
                        var msg = "Error fetching template: " + error.data.message;
                        callback(1, msg);
                    });
                },
                function(callback)
                {
                    instancesService.get_schema()
                        .then(function(response) {
                            $scope.schema = response.data;
                            callback(null, null);
                        }).catch(function(error) {
                        var msg = "Error fetching schema: " + error.data.message;
                        callback(1, msg);

                    });
                }
            ],function(err, results){
                if(err)
                {
                    console.error(err);
                }
            });
        }
    });