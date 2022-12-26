const path = require('path');

const extraNodeModules = {
  FeatureApp: path.resolve(__dirname + '/../FeatureApp'),
  'micro-app-2': path.resolve(__dirname + '/../MicroApp2'),
};

const watchFolders = [
  path.resolve(__dirname + '/../FeatureApp'),
  path.resolve(__dirname + '/../MicroApp2'),
];
console.log(watchFolders);

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules: new Proxy(extraNodeModules, {
      get: (target, name) => {
        // redirects dependencies referenced from shared/ to local node_modules
        return name in target
          ? target[name]
          : path.join(process.cwd(), `node_modules/${name.toString()}`);
      },
    }),
  },
  watchFolders,
};
