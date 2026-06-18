COMPOSE_DEV = -f ./backend/docker-compose.dev.yml

.PHONY: up-db stop-db down-db

# Вместо db пишем точное имя сервиса, например, postgres
up-db:
	docker compose $(COMPOSE_DEV) up -d postgres

stop-db:
	docker compose $(COMPOSE_DEV) stop postgres

down-db:
	docker compose $(COMPOSE_DEV) down
