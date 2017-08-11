(function () {
'use strict';
var module = 'cadastro';
angular.module(module)
 .controller('CadastroController', CadastroController)
 .controller('CadastroControllerDados', CadastroControllerDados);

CadastroController.$inject = ['ApiService', '$state', '$stateParams', '$scope', '$filter', 'toaster'];

function CadastroController(ApiService, $state, $stateParams, $scope, $filter, toaster) {
    var vm = this;
    var apiRoute = '/cadastro/';
    var stateDefault = 'cadastro';

    console.log('here');

    vm.form = {};

    vm.save = save;

    function save() {
        ApiService.post(apiRoute, vm.form).then(function (data) {
            console.log(data);
            if (data.success) {
                toaster.pop('success', 'Mensagem', 'Salvo com sucesso!');
                $state.go(stateDefault, {}, { reload: true, inherit: false });
            } else {
                toaster.pop('error', 'Mensagem', 'Ocorreu um erro, tente novamente!');
            }
        });
    }
}

CadastroControllerDados.$inject = ['ApiService', '$state', '$stateParams', '$scope', '$filter', 'toaster', 'JwtService'];

function CadastroControllerDados(ApiService, $state, $stateParams, $scope, $filter, toaster, JwtService) {
    var vm = this;
    var apiRoute = '/v1/meusdados/';
    var stateDefault = 'meusdados';

    vm.form = {};

    vm.save = save;

    start();

    function start() {
        var token = jwt_decode(JwtService.getToken());
        ApiService.get(apiRoute + token._id).then(function (data) {
            vm.form = data;
            console.log(data);
        });
    }

    function save() {
        if (vm.form._id) {
            ApiService.put(apiRoute, vm.form).then(function (data) {
                console.log(data);
                if (data.success) {
                    toaster.pop('success', 'Mensagem', 'Salvo com sucesso!');
                    $state.go(stateDefault, {}, { reload: true, inherit: false });
                } else {
                    toaster.pop('error', 'Mensagem', 'Ocorreu um erro, tente novamente!');
                }
            });
        }
    }
}
})();
