(function () {
'use strict';

angular.module('decks')
 .controller('DecksController', DecksController);

DecksController.$inject = ['ApiService', 'JwtService', 'toaster', '$state', '$stateParams', '$timeout'];

function DecksController(ApiService, JwtService, toaster, $state, $stateParams, $timeout) {
    var vm = this;

    var apiRoute = '/v1/decks/';
    var stateDefault = 'decks';

    vm.form = {};
    vm.lista = [];
    vm.quantidade = 4;
    vm.item = {};

    vm.save = save;
    vm.findCartas = findCartas;
    vm.select = select;
    vm.addCarta = addCarta;
    vm.pad = pad;
    vm.diminui = diminui;
    vm.remove = remove;
    vm.makePath = makePath;

    start();

    function start() {

        var id = $stateParams.id;
        if (id) {
            getItem(id);
        }

        ApiService.get(apiRoute).then(function (data) {
            vm.lista = data.data;
        });
    }

    function getItem(id) {
        ApiService.get(apiRoute + id).then(function (data) {
            vm.form = data;
        });
    }

    function save() {
        if (!vm.form._id) {
            ApiService.post(apiRoute, vm.form).then(function (data) {
                if (data.success) {
                    toaster.pop('success', 'Mensagem', 'Deck salvo com sucesso!');
                    $state.go(stateDefault, {}, { reload: true, inherit: false });
                } else {
                    toaster.pop('error', 'Mensagem', 'Ocorreu um erro, tente novamente!');
                }
            });
        } else {
            ApiService.put(apiRoute, vm.form).then(function (data) {
                if (data.success) {
                    toaster.pop('success', 'Mensagem', 'Deck salvo com sucesso!');

                    if (!$stateParams.id)
                    $state.go(stateDefault, {}, { reload: true, inherit: false });
                } else {
                    toaster.pop('error', 'Mensagem', 'Ocorreu um erro, tente novamente!');
                }
            });
        }
    }

    function findCartas(keyword) {
        return ApiService.get('/v1/cartas/0/9999/' + keyword).then(function (res) {
            vm.cartas = res.data;
            return vm.cartas;
        });
    }

    function select(item) {
        vm.item = item;
    }

    function addCarta() {
        vm.added = true;
        var cartaNova = {};
        cartaNova.carta = vm.item._id;
        cartaNova.quantidade = vm.quantidade;
        cartaNova.name = vm.item.name;
        cartaNova.manaCost = vm.item.manaCost;
        cartaNova.type = vm.item.type;

        vm.form.cartas.push(cartaNova);

        vm.quantidade = 4;
        vm.item = {};
        vm.cartaSelected = '';

        $timeout(function () {
            vm.added = false;
        }, 300);
    }

    function pad(num) {
        var s = num + '';
        while (s.length < 2) s = '0' + s;
        return s;
    }

    function diminui(carta) {
        if (carta.quantidade > 1) {
            carta.quantidade = carta.quantidade - 1;
        }
    }

    function remove(index) {
        if (confirm('Deseja remover a carta: ' + vm.form.cartas[index].name + '?'))
        vm.form.cartas.splice(index, 1);
    }

    function makePath() {
        if (vm.item.language) {
            //var path = 'http://magiccards.info/scans/' + vm.item.language + '/' + vm.item.code.toLowerCase() + '/' + vm.item.number + '.jpg';
            var path = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=' + vm.item.multiverseid + '&type=card';
            console.log(path);
            return path;
        }
    }
}
})();
