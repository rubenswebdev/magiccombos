(function () {
'use strict';

var module = 'decks';
var controller = 'DecksController';

angular.module(module, []).config(states);

states.$inject = ['$stateProvider', 'LoadingProvider'];

function states($stateProvider, LoadingProvider) {
    $stateProvider
        .state(module, {
            url: '/' + module,
            views: {
                '': {
                    templateUrl: LoadingProvider.uncache('app/modules/' + module + '/home.html'),
                    controller: controller,
                    controllerAs: 'vm',
                },
                nav: {
                    templateUrl: LoadingProvider.uncache('app/templates/nav.html'),
                },
            },
        }).state(module + '.add', {
            url: '/add',
            views: {
                '': {
                    templateUrl: LoadingProvider.uncache('app/modules/' + module + '/form.html'),
                    controller: controller,
                    controllerAs: 'vm',
                },
                nav: {
                    templateUrl: LoadingProvider.uncache('app/templates/nav.html'),
                    controller: 'NavController',
                    controllerAs: 'vm',
                },
            },
        }).state(module + '.edit', {
            url: '/edit/:id',
            views: {
                '': {
                    templateUrl: LoadingProvider.uncache('app/modules/' + module + '/form.html'),
                    controller: controller,
                    controllerAs: 'vm',
                },
                nav: {
                    templateUrl: LoadingProvider.uncache('app/templates/nav.html'),
                    controller: 'NavController',
                    controllerAs: 'vm',
                },
            },
        }).state(module + '.cartas', {
            url: '/cartas/:id',
            views: {
                '': {
                    templateUrl: LoadingProvider.uncache('app/modules/' + module + '/cartas.html'),
                    controller: controller,
                    controllerAs: 'vm',
                },
                nav: {
                    templateUrl: LoadingProvider.uncache('app/templates/nav.html'),
                    controller: 'NavController',
                    controllerAs: 'vm',
                },
            },
        });
    ;
}
})();
