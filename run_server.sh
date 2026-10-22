#!/bin/bash

# Exit if any errors arise
set -e

if [ -d /app/server-swap ]; then
  # Swap out the server directory with the one prepared by run_build.sh
  if [ -d /app/server ]; then
    mv /app/server /app/server-backup
  fi
  mv /app/server-swap /app/server
fi

if [ ! -d /app/server ]; then
  echo "No build artifacts found! Make sure to run the build container first."
  exit 1
fi

# Start the Next.js server
cd /app/server
node server.js
