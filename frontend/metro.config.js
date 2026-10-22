const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
    server: {
        proxy: {
          '/api': {
            target: 'http://10.0.2.2:8080',
            changeOrigin: true,
          },
        },
    },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
