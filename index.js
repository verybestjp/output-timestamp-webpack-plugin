const fs = require('fs');
const path = require('path');

class Plugin {
  constructor({ path = '', filename = 'timestamp.json' }) {
    this.path = path;
    this.filename = filename;
  }

  apply(compiler) {
    const outputPath = path.join(this.path, this.filename);

    const now = Date.now()
    const dateObj = {
      X: Math.floor( now / 1000 ),
    };
    const json = JSON.stringify(dateObj);

    const emitHandler = (compiler, callback) => {
      compiler.assets[outputPath] = {
        source: () => json,
        size: () => json.length,
      };
      callback();
    };
    if (typeof compiler.plugin === 'function') {
      // webpack4
      compiler.plugin('emit', emitHandler);
    } else {
      // webpack5
      compiler.hooks.emit.tapAsync('PluginName', emitHandler);
    }
  }
}
module.exports = Plugin;
