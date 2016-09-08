angular.module('dendroIMApp.controllers')
    /*
     *  Window controller
     */
    .controller('allInstancesCtrl', function (
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

    $scope.load_instances = function()
    {
        instancesService.get_all()
            .then(function(response){
                $scope.instances = response.data;
            })
            .catch(function(error){
                console.log("Error fetching instances: " + JSON.stringify(error));
            });
    };

    $scope.create_new = function(instance)
    {
        instancesService.create_new(instance)
            .then(function(response){
                windowService.show_popup("success", "OK", "Instance" + Object.keys(instance)[0] + " created.");
            })
            .catch(function(error)
            {
                windowService.show_popup("error", "Error", "Unable to create instance" + Object.keys(instance)[0] + "." + JSON.stringify(error));
            });
    };
    
    $scope.init = function()
    {
        $scope.instances = {};
        $scope.load_instances();
    }
});