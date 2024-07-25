#! /bin/sh
npm run build

docker buildx build \
 --platform linux/amd64,linux/arm64 \
 -t bogyumkim/bows-frontend:latest \
 --no-cache \
 --push .