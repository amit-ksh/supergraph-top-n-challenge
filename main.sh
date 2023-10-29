#!/bin/bash

# Start the 'threads' and 'posts' services
docker-compose up -d threads
docker-compose up -d posts

# Check if Docker is available and running
if ! docker --version &> /dev/null; then
  echo "Docker is not installed or not running. Please install Docker and start it."
  exit 1
fi

# Create a temporary Docker container to run the wait-on tool
docker run --rm -it \
  --network=host \
  -v "$(pwd)":/app \
  -w /app \
  node:14-alpine \
  sh -c "npm install wait-on && npx wait-on tcp:localhost:4001 tcp:localhost:4002"

# Start the 'gateway' service
docker-compose up -d gateway
