(function () {
'use strict';

var module = 'cadastro';
var controller = 'CadastroController';

angular.module(module, []).config(states);

states.$inject = ['$stateProvider', 'LoadingProvider'];

function states($stateProvider, LoadingProvider) {
    $stateProvider
        .state(module, {
            url: '/cadastro',
            views: {
                '': {
                    templateUrl: LoadingProvider.uncache('app/modules/' + module + '/form.html'),
                    controller: controller,
                    controllerAs: 'vm',
                },
                nav: {
                    templateUrl: LoadingProvider.uncache('app/templates/nav.html'),
                },
            },
        })
        .state('meusdados', {
            url: '/meusdados',
            views: {
                '': {
                    templateUrl: LoadingProvider.uncache('app/modules/' + module + '/form.html'),
                    controller: 'CadastroControllerDados',
                    controllerAs: 'vm',
                },
                nav: {
                    templateUrl: LoadingProvider.uncache('app/templates/nav.html'),
                },
            },
        });
}
})();
