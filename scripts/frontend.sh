#!/bin/sh

if [ "$1" = "build" ]; then
  docker compose -f docker/frontend.staging.yml build
fi

docker compose -f docker/frontend.staging.yml up -d
