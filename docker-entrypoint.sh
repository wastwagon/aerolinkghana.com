#!/bin/sh
set -e

if [ -n "$DATABASE_URL" ]; then
  echo "Running Prisma migrations..."
  node ./node_modules/prisma/build/index.js migrate deploy
fi

echo "Starting AeroLink Ghana..."
exec node server.js
