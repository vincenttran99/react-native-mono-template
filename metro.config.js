const { getDefaultConfig } = require("expo/metro-config");

const defaultConfig = getDefaultConfig(__dirname);
/** @type {import('expo/metro-config').MetroConfig} */
const config = {
  ...defaultConfig,
  resolver: {
    ...defaultConfig.resolver,
    assetExts: [...defaultConfig.resolver.assetExts, "lottie"],
  },
  transformer: {
    ...defaultConfig.transformer,
    experimentalImportSupport: true,
    inlineRequires: true,
  },
};

config.resolver.resolveRequest = function packageExportsResolver(
  context,
  moduleImport,
  platform
) {
  // Use the browser version of the package for React Native
  if (moduleImport === "axios" || moduleImport.startsWith("axios/")) {
    return context.resolveRequest(
      {
        ...context,
        unstable_conditionNames: ["browser"],
      },
      moduleImport,
      platform
    );
  }

  // Fall back to normal resolution
  return context.resolveRequest(context, moduleImport, platform);
};

module.exports = config;
