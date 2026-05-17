const { default: nextConfig } = require("./next.config.mjs")


module.exports = {
  allowedDevOrigins: ['http://192.168.8.77:3000', 'http://192.168.137.115', 'local-origin.dev', '*.local-origin.dev'],
}

module.exports = nextConfig