#!/bin/sh

yarn ssr-prod
cp credentials build/server/
cp data build/server/


# ./node_modules/.bin/webpack --config ssr/webpack.config.js 
# node build/js/server.js

# ./node_modules/.bin/webpack --config ssr/webpack.config.js --watch

# ./node_modules/.bin/webpack-dev-server --config ssr/webpack.config.js --env.platform=server 
# ./node_modules/.bin/webpack-dev-server --config ssr/webpack.config.js --env.platform=web

