#!/bin/sh

if [ "$1" = "build" ]; then
  docker compose -f docker/backend.staging.yml --env-file .env build
fi

docker compose -f docker/backend.staging.yml --env-file .env up -d
