.PHONY: help

# When building for the first time, run the following to generate and apply migrations
up-first-time:
		docker-compose --env-file .env.local up -d
		sleep 5
		docker-compose ps
		sleep 2
		dotenv -f .env.local pnpm generate
		sleep 2
		dotenv -f .env.local pnpm migrate:dev
		sleep 2
		pnpm dev

# If db migrations already in place, just run the following to init db and server
up:
		docker-compose --env-file .env.local up -d
		sleep 5
		docker-compose ps
		sleep 2
		pnpm dev

# Run the following to init only db without the server
up-db:
		docker-compose --env-file .env.local up -d
		sleep 5
		docker-compose ps

# Run the following to start the server if db is already running on docker
up-server:
		pnpm dev

# Stop the db container
down:
		docker-compose down

# Generate only the migrations files without applying to db
migrations:
		dotenv -f .env.local pnpm migration:create:dev

# Apply migrations to db [RISKY OPERATION]
migrate:
		dotenv -f .env.local pnpm migrate:dev

# Rollback last applied migration [RISKY OPERATION]
rollback:
		dotenv -f .env.local pnpm migrate:reset:dev

status:
		docker-compose ps
