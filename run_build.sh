#!/bin/bash

# Exit if any errors arise
set -e

# Build the client and pre-render all static pages (takes a few minutes)
cd /app/build
npm run build

# Delete left-overs from previous swaps
rm -rf /app/server-swap
rm -rf /app/server-backup

# Prepare the swap (the actual swap happens in run_server.sh)
cp -r /app/build /app/server-swap