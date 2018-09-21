#!/bin/sh

yarn ssr-prod
cp -r credentials build/server
cp -r data build/server

# ./node_modules/.bin/webpack --config ssr/webpack.config.js 
# node build/js/server.js

# ./node_modules/.bin/webpack --config ssr/webpack.config.js --watch
