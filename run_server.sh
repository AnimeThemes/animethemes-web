#!/bin/bash

# Exit if any errors arise
set -e

if [ ! -d /app/.next.swap ]; then
  echo "No build artifacts found! Make sure to run the build container first."
  exit 1
fi

# Swap out the .next directory with the one prepared by run_build.sh
if [ -d /app/.next ]; then
  mv /app/.next /app/.next.backup
fi
mv /app/.next.swap /app/.next

# Start the Next.js server
npm run start