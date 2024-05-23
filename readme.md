# Pinehaus

Directory structure:

- ☁️ `docker/` - Docker services definitions
- 🌐 `frontend/` - NextJS frontend application
- 🖥️ `backend/` - Spring Boot backend application
- 🚪 `nginx/` - NGINX configuration for backend proxy layer
- 📦 `scripts/` - Utility scripts for building and running containers

## Prepare environment

Copy the environment file and fill it with the necessary data.

```bash
cp .env.example .env
```

## Scripts

There exist utility scripts whcih handle docker commands for building and running containers.

Prerequisite: Make the scripts executable.

```bash
chmod u+x scripts/backend.sh
chmod u+x scripts/frontend.sh
```

### Build and run

```bash
./scripts/backend.sh build
```

```bash
./scripts/frontend.sh build
```

### Run

```bash
./scripts/backend.sh
```

```bash
./scripts/frontend.sh
```
