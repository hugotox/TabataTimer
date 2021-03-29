module.exports = function (api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            routes: './src/routes',
            screens: './src/screens',
            store: './src/store',
            utils: './src/utils',
          },
        },
      ],
    ],
  }
}
