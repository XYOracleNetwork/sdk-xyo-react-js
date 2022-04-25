# syntax=docker/dockerfile:1
# Build here and pull down all the devDependencies
FROM node:16 AS builder
WORKDIR /app
COPY . .
RUN yarn install
RUN yarn build

# Just install the production dependencies here
FROM node:16 AS dependencies
WORKDIR /app
COPY ./package.json ./package.json
COPY ./yarn.lock ./yarn.lock
RUN yarn install --production --immutable

# Copy over the compiled output and production dependencies
# into a slimmer container
FROM node:16-alpine
ENV PORT="80"
WORKDIR /app

# Copy over the compiled static app
ARG BUILD_OUTPUT_DIR=build
COPY --from=builder /app/${BUILD_OUTPUT_DIR} ./bin/build

# Copy over the meta-server to run the app
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/node_modules/@xyo-network/sdk-xyo-react/dist/node ./dist/node
COPY --from=dependencies /app/node_modules/@xyo-network/sdk-xyo-react/bin/start-meta.js ./bin/start-meta.js

WORKDIR /app/bin

# Start the meta-server pointed to the static app
CMD ["node", "start-meta.mjs"]
