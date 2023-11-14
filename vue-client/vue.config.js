const { defineConfig } = require('@vue/cli-service');
const path = require('path');
const fs = require('fs-extra');

module.exports = defineConfig({
  transpileDependencies: ['vuetify'],
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        fs: false, // Disable the built-in 'fs' module
        stream: require.resolve("stream-browserify"),
        crypto: require.resolve("crypto-browserify"),
        assert: require.resolve("assert/"),
        process: require.resolve("process/browser"),
        os: require.resolve("os-browserify/browser"),
        zlib: require.resolve("browserify-zlib"),
        url: require.resolve("url/"),
        child_process: false, // Disable 'child_process'
        net: false, // Disable 'net'
        tls: false, // Disable 'tls'
      },
      alias: {
        '@mapbox/node-pre-gyp': '@/node_modules/@mapbox/node-pre-gyp',
      },
    },
  },
  chainWebpack: (config) => {
    // Use 'fs-extra' as a polyfill for 'fs'
    config.plugin('copy-fs-extra').use(require('copy-webpack-plugin'), [
      {
        patterns: [
          {
            from: path.resolve('node_modules/fs-extra'),
            to: path.resolve(config.output.get('path'), 'fs'),
          },
        ],
      },
    ]);
  },
});
