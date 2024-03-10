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
          assets: './src/assets',
          components: './src/components',
          config: './src/config',
          contexts: "./src/contexts",
          customWidgets: "./src/customWidgets",
        },
      },
    ],
  ]
};
