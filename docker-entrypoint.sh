#!/bin/sh
set -e

if [ -n "$DATABASE_URL" ]; then
  echo "Running Prisma migrations..."
  node ./node_modules/prisma/build/index.js migrate deploy

  if [ "${RUN_DB_SEED:-true}" != "false" ]; then
    echo "Seeding database (skipped if already seeded)..."
    if ! node prisma/seed.prod.mjs; then
      echo "WARN: database seed failed — continuing startup"
    fi
  fi
fi

echo "Starting AeroLink Ghana..."
exec node server.js
