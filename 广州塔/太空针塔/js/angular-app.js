angular.module("sn.app", [
        "menus.module",
        "billboard.module"
]).config(['$httpProvider', function($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"]
    }]);

angular.module("sn.app2", [
    "menus.module"
]).config(['$httpProvider', function($httpProvider) {
        delete $httpProvider.defaults.headers.common["X-Requested-With"]
    }]);

