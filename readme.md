# Pinehaus

Directory structure:

- ☁️ `docker/` - Docker services definitions
- 🌐 `frontend/` - NextJS frontend application

## Build

```bash
docker compose -f docker/frontend.staging.yml build
```

## Run

```bash
docker compose -f docker/frontend.staging.yml up
```
