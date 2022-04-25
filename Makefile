DC := docker compose

up:
	$(DC) up -d
build:
	$(DC) build --no-cache --force-rm
create-project:
	mkdir -p laravel_src
	@make build
	@make up
	@make laravel-install
	$(DC) exec laravel_app php artisan key:generate
	$(DC) exec laravel_app php artisan storage:link
	$(DC) exec laravel_app chown -R $$UNAME:$$UNAME bootstrap/cache
	@make fresh
install-recommend-packages:
	$(DC) exec laravel_app composer require doctrine/dbal
	$(DC) exec laravel_app composer require --dev ucan-lab/laravel-dacapo
	$(DC) exec laravel_app composer require --dev barryvdh/laravel-ide-helper
	$(DC) exec laravel_app composer require --dev beyondcode/laravel-dump-server
	$(DC) exec laravel_app composer require --dev barryvdh/laravel-debugbar
	$(DC) exec laravel_app composer require --dev roave/security-advisories:dev-master
	$(DC) exec laravel_app php artisan vendor:publish --provider="BeyondCode\DumpServer\DumpServerServiceProvider"
	$(DC) exec laravel_app php artisan vendor:publish --provider="Barryvdh\Debugbar\ServiceProvider"
init:
	$(DC) up -d --build
	$(DC) exec laravel_app composer install
	$(DC) exec laravel_app cp .env.example .env
	$(DC) exec laravel_app php artisan key:generate
	$(DC) exec laravel_app php artisan storage:link
	$(DC) exec laravel_app chown -R $$UNAME:$$UNAME bootstrap/cache
	@make fresh
	@make swagger
remake:
	@make destroy
	@make init
stop:
	$(DC) stop
down:
	$(DC) down --remove-orphans
restart:
	@make down
	@make up
destroy:
	$(DC) down --rmi all --volumes --remove-orphans
destroy-volumes:
	$(DC) down --volumes --remove-orphans
ps:
	$(DC) ps
top:
	$(DC) top
logs:
	$(DC) logs
logs-watch:
	$(DC) logs --follow
log-web:
	$(DC) logs web
log-web-watch:
	$(DC) logs --follow web
log-laravel_app:
	$(DC) logs laravel_app
log-laravel_app-watch:
	$(DC) logs --follow laravel_app
log-db:
	$(DC) logs db
log-db-watch:
	$(DC) logs --follow db
web:
	$(DC) exec web bash
laravel_app:
	$(DC) exec laravel_app bash
react_app:
	$(DC) exec react_app sh 
cron:
	$(DC) exec cron bash
worker:
	$(DC) exec worker bash
migrate:
	$(DC) exec laravel_app php artisan migrate
fresh:
	$(DC) exec laravel_app php artisan migrate:fresh --seed
seed:
	$(DC) exec laravel_app php artisan db:seed
dacapo:
	$(DC) exec laravel_app php artisan dacapo
rollback-test:
	$(DC) exec laravel_app php artisan migrate:fresh
	$(DC) exec laravel_app php artisan migrate:refresh
tinker:
	$(DC) exec laravel_app php artisan tinker
test:
	$(DC) exec laravel_app php artisan test
optimize:
	$(DC) exec laravel_app php artisan optimize
optimize-clear:
	$(DC) exec laravel_app php artisan optimize:clear
cache:
	$(DC) exec laravel_app composer dump-autoload -o
	@make optimize
	$(DC) exec laravel_app php artisan event:cache
	$(DC) exec laravel_app php artisan view:cache
	$(DC) exec laravel_app php artisan config:cache
cache-clear:
	$(DC) exec laravel_app composer clear-cache
	@make optimize-clear
	$(DC) exec laravel_app php artisan event:clear
	$(DC) exec laravel_app php artisan config:clear
db:
	$(DC) exec db bash
sql:
	$(DC) exec db bash -c 'mysql -u $$MYSQL_USER -p$$MYSQL_PASSWORD $$MYSQL_DATABASE'
ide-helper:
	$(DC) exec laravel_app php artisan clear-compiled
	$(DC) exec laravel_app php artisan ide-helper:generate
	$(DC) exec laravel_app php artisan ide-helper:meta
	$(DC) exec laravel_app php artisan ide-helper:models --nowrite

swagger:
	$(DC) exec laravel_app php artisan l5-swagger:generate

update-packages:
	$(DC) exec laravel_app composer update

code-format:
	$(DC) exec laravel_app composer format
