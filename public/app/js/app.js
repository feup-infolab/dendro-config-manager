'use strict';

//this HAS TO BE A GLOBAL VAR https://github.com/sciactive/pnotify/issues/23
PNotify.prototype.options.styling = "bootstrap3";
var stack_bottomright = {"dir1": "up", "dir2": "left", "firstpos1": 25, "firstpos2": 25};

// Declare app level module which depends on filters, and services
angular.module('dendroIMApp', [
        'dendroIMApp.controllers',
        'dendroIMApp.filters',
        'dendroIMApp.services',
        'dendroIMApp.directives',
        'dendroIMApp.factories',
        'ngRoute',
        'ngAnimate',
        'ngTagsInput',
        'ngStorage',
        'ui.tree',
        'angular-loading-bar',
        'ui.bootstrap',
        'codemwnci.markdown-edit-preview',
        'angularMoment',
        'eugeneware.shoe',
        'ui.ace',
        'hljs',
        'ng.jsoneditor'
]).filter('trustAsResourceUrl', ['$sce', function($sce) {
    return function(val) {
        return $sce.trustAsResourceUrl(val);
    };
}]);
