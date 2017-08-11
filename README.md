### Estrutura básica para criar um sistema com MEAN modular, login já incluído.

---
### Requer devidamente instalado

* Apache2
    * sudo apt-get install nginx
* MongoDB
* NodeJS

---

* crie a config do host usando o [nginx-manager](https://github.com/rubensfernandes/nginx-manager) basta rodar

```
sudo npm install -g nginx-manager
sudo nginx-manager -d /var/www/projetos/meanbase/frontend/ -u meanbasenginx.dev -n meanbasenginx -p 20
```

* Observe que para porta colocamos apenas a inicial, se sua porta é 2020 você deve colocar apenas o 20, o nginx-manager vai gerar as portas na sequência, ex:
2020 2021 2022 2023

* Na pasta **frontend**

```
bower install
npm install
```

> Se for na **PRODUÇÃO** rode na pasta **frontend** e não esqueça de criar a config do host apontando pra pasta **dist** dentro de frontend

```
grunt
```

* Na pasta **frontend** duplique o arquivo **config.js.dist** para **config.js** e edite conforme configurou sua url do projeto

```javascript
(function () {
    'use strict';

    angular.module('app')
        .constant('myConfig', {
            api: window.location.origin + '/api',
        });

    angular.module('core')
        .constant('coreConfig', {
            cache: true,
        });
})();
```


> se tudo foi configurado certo acesse: projeto.dev e você verá uma tela de login parecida com essa:

![tela de login](./__ignore__/foto1.png "Logo Title Text 1")


## Ok agora vamos configurar o **backend** :rocket:

* na pasta backend

```
npm install
```

* novamente duplique o arquivo **config.js.dist** para **config.js**

```javascript
module.exports = {
    secret: 'token_aleatorio_para_o_jwt',
    database: 'mongodb://127.0.0.1:27017/meanbase',
    uploadPath: '/var/www/projeto/frontend/uploads/',
    initialPort: 2020,
 	passFixture: 'senha_para_fixture',
};

```

> atenção na **initialPort** tem que ser a mesma usada na hora de criar a config do nginx

* dentro da pasta **backend**, iniciamos nosso servidor, so use o --node-args caso seu sistema esteja fazendo uso muito intenso de memória RAM

```
pm2 start start.js --name="meanbase" --node-args="--max-old-space-size=6144" --watch
```

> se tudo foi configurado corretamente irá aparecer algo como, depende da quantidade de processadores da máquina
```
Server start: 2020
Server start: 2021
Server start: 2022
Server start: 2023
```

## Agora vamos criar o usuário admin para logar no sistema

* pelo navegador acesse: projeto.dev/api/fixture/usuario/senha_para_fixture

> **senha_para_fixture** é configurada no arquivo de config.js do backend

---

:airplane: Pronto agora você pode acessar a url do projeto e logar com o usuário: **admin** e a senha: **admin** :airplane:
