#!/bin/bash

# Exit if any errors arise
set -e

if [ ! -d /app/server/.next.swap ]; then
  echo "No build artifacts found! Make sure to run the build container first."
  exit 1
fi

# Swap out the .next directory with the one prepared by run_build.sh
if [ -d /app/server/.next ]; then
  mv /app/server/.next /app/server/.next.backup
fi
mv /app/server/.next.swap /app/server/.next

# Start the Next.js server
npm run start