(function () {
'use strict';

angular.module('dashboard')
 .controller('DashboardController', DashboardController);

DashboardController.$inject = ['ApiService', 'JwtService', 'toaster', '$state'];

function DashboardController(ApiService, JwtService, toaster, $state) {
    var vm = this;
    var stateDefault = 'dashboard';

    start();

    function start() {
    }
}
})();
