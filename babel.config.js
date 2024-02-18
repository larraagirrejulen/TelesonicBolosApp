module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ["module:react-native-dotenv", {
      envName: "APP_ENV",
      moduleName: "@env",
      path: ".env"
    }],
    [
      'module-resolver',
      {
        alias: {
          src: './src',
          contexts: "./src/contexts",
          styles: "./src/styles",
          assets: './src/assets',
          components: './src/components',
          tabs: './src/components/tabs',
          typeScripts: './src/ts',
        },
      },
    ],
  ]
};
