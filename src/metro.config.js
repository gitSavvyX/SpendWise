const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// 1. Let Metro treat .wasm files as assets.
if (!config.resolver.assetExts.includes('wasm')) {
  config.resolver.assetExts.push('wasm');
}

// 2. Add headers required for SQLite on the web (SharedArrayBuffer).
const enhanceMiddleware = config.server.enhanceMiddleware;
config.server.enhanceMiddleware = (middleware, metroServer) => {
  const enhancedMiddleware = enhanceMiddleware
    ? enhanceMiddleware(middleware, metroServer)
    : middleware;
  return (req, res, next) => {
    res.setHeader('Cross-Origin-Embedder-Policy', 'credentialless');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    return enhancedMiddleware(req, res, next);
  };
};

module.exports = config;