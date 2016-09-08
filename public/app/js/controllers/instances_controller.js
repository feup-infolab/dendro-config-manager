angular.module('dendroIMApp.controllers')
    /*
     *  Window controller
     */
    .controller('instancesCtrl', function (
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
        "expanded" : true
    };

    $scope.options_right = {
        "mode": "tree",
        "modes": [
            "tree",
            "form",
            "code",
            "text"
        ],
        "history": false,
        "expanded" : true
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

    $scope.cancel_instance_creation = function()
    {
        window.location.href = '/instances';
    };

    $scope.editor_loaded = function(jsonEditor){
        if(jsonEditor.getMode() == "tree")
        {
            windowService.show_popup("success", "Data loaded", "Instance successfully loaded");
            jsonEditor.expandAll();
        }
    };

    $scope.init = function()
    {
        $scope.instances = {};
        instancesService.get_all();

        instancesService.get_template()
            .then(function(response) {
                $scope.instance_template = response.data;
                $scope.new_instance = response.data;
            }).catch(function(error) {
                console.log("Error fetching template: " + JSON.stringify(error));
            });
    }
});