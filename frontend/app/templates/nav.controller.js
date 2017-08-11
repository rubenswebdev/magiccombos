(function () {
    'use strict';

    angular.module('app')
    .controller('NavController', NavController);

    NavController.$inject = ['JwtService', '$state', '$window'];
    function NavController(JwtService, $state, $window) {
        var vm = this;

        vm.sair = sair;
        vm.token = JwtService.getToken();

        if (vm.token) {
            vm.token = jwt_decode(vm.token);
        }

        function sair() {
            delete $window.localStorage.token;
            $state.go('login', {}, { reload: true, inherit: false });
        }

    }
})();
