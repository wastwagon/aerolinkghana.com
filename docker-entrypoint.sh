#!/bin/sh
set -e

if [ -n "$DATABASE_URL" ]; then
  echo "Running Prisma migrations..."
  node ./node_modules/prisma/build/index.js migrate deploy

  if [ "${RUN_DB_SEED:-true}" != "false" ]; then
    echo "Seeding database (skipped if already seeded)..."
    node ./node_modules/tsx/dist/cli.mjs prisma/seed.ts
  fi
fi

echo "Starting AeroLink Ghana..."
exec node server.js
