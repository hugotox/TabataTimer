module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './src/assets',
            components: './src/components',
            routes: './src/routes',
            screens: './src/screens',
            store: './src/store',
            theme: './src/theme',
            utils: './src/utils',
          },
        },
      ],
    ],
  }
}
