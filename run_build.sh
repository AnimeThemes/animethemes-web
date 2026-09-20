#!/bin/bash

# Exit if any errors arise
set -e

# Build the client and pre-render all static pages (takes a few minutes)
npm run build

# Delete left-overs from previous swaps
rm -rf /server/.next.swap
rm -rf /server/.next.backup

# Prepare the swap (the actual swap happens in run_server.sh)
cp -r /app/.next /server/.next.swap