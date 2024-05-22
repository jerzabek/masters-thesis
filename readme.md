# Pinehaus

Directory structure:

- ☁️ `docker/` - Docker services definitions
- 🌐 `frontend/` - NextJS frontend application
- 🖥️ `backend/` - Spring Boot backend application

.

## Prepare environment

Copy the environment file and fill it with the necessary data.

```bash
cp .env.example .env
```

## Build

```bash
docker compose -f docker/backend.staging.yml build
```

```bash
docker compose -f docker/frontend.staging.yml build
```

## Run

```bash
docker compose -f docker/backend.staging.yml --env-file .env up
```

```bash
docker compose -f docker/frontend.staging.yml up
```
