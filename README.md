## Instruções

Após clonar o repo executar os seguintes comandos nesta sequencia:

- cd api
- Alterar E-mail dentro do .env.example para o email que deseja receber as notificações e acessar a aplicação
- cp .env.example .env
- composer install
- php artisan key:generate
- cd ..
- cd web
- npm install || yarn install
- npm run build || yarn build
- cd ..
- docker compose -f 'docker-compose.yml' up -d --build
- docker exec -it laravel-api bash
- php artisan optimize:clear
- php artisan migrate --seed
- exit
  
Caso aconteça algum problema no build do App WEB, apague o arquivo dockfile da pasta web para não gerar a imagem e execute os seguintes comandos dentro da pasta web

- npm run build || yarn build
- npm run start || yarn start


## Observação

A configuração do queue do laravel está sync.

As senhas do banco de dado estão no .env raiz
