// Pluxee Mobile App - Metro Config
// Monorepo (npm workspaces) için Metro'yu yapılandırır

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Workspace root'u izle (design-system değişikliklerini takip için)
config.watchFolders = [workspaceRoot];

// 2. Hem mobile-app hem root node_modules'i ara
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, 'node_modules'),
  path.resolve(workspaceRoot, 'node_modules'),
];

// NOT: disableHierarchicalLookup KALDIRILDI
// Çünkü Expo dahili paketleri (expo-asset, expo-constants vb.)
// hierarchical lookup ile node_modules'da bulunuyor.

module.exports = config;
