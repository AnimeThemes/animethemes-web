#!/bin/bash

# Exit if any errors arise
set -e

# Build the client and pre-render all static pages (takes a few minutes)
npm run build

# Copy all the assets Next.js don't include by default
cp -r public .next/standalone/
cp -r .next/static .next/standalone/.next/
cp -r .next/cache .next/standalone/.next/

# Delete left-overs from previous swaps
rm -rf /app/server-swap
rm -rf /app/server-backup

# Prepare the swap (the actual swap happens in run_server.sh)
cp -r .next/standalone /app/server-swap
