const path = require('path');
const {makeMetroConfig} = require('@rnx-kit/metro-config');
const MetroSymlinksResolver = require('@rnx-kit/metro-resolver-symlinks');
const extraNodeModules = {
  FeatureApp: path.resolve(__dirname, '../FeatureApp'),
  'micro-app-2': path.resolve(__dirname, '../MicroApp2'),
};

const extraNodeModulesFromNodeModules = {
  FeatureApp: path.resolve(__dirname, 'node_modules', 'FeatureApp'),
};

const watchFolders = [
  path.resolve(__dirname, '../FeatureApp'),
  path.resolve(__dirname, '../MicroApp2'),
];
console.log(watchFolders);

/**
 * Working with npm links.
 */
// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: true,
//         inlineRequires: true,
//       },
//     }),
//   },
//   resolver: {
//     extraNodeModules: new Proxy(extraNodeModules, {
//       get: (target, name) => {
//         // redirects dependencies referenced from micro-app/ to local node_modules
//         return name in target
//           ? target[name]
//           : path.join(process.cwd(), `node_modules/${name.toString()}`);
//       },
//     }),
//   },
//   watchFolders,
// };

// `makeMetroConfig helps to ensure there is only 1 copy of "react" and "react-native".
// so i do not need to symlink react and react-native inside Feature/
module.exports = makeMetroConfig({
  projectRoot: __dirname,
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    //extraNodeModules: extraNodeModulesFromNodeModules,
    // This MetroSymlinksResolver works for normal symlink via "ln -s". yarn/npm links doesnt seem to work for me.
    resolveRequest: MetroSymlinksResolver(),
  },
  watchFolders,
});
