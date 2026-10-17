#!/bin/bash

# Exit if any errors arise
set -e

# Build the client and pre-render all static pages (takes a few minutes)
npm run build

# Delete left-overs from previous swaps
rm -rf /app/server/.next.swap
rm -rf /app/server/.next.backup

# If this is the first build, we first need to copy the entire build directory
if [ ! -d /app/server ]; then
  cp -r /app/build /app/server
fi

# Prepare the swap (the actual swap happens in run_server.sh)
cp -r /app/build/.next /app/server/.next.swap