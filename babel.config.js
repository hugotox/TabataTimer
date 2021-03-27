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
            store: './src/store',
            routes: './src/routes',
            screens: './src/screens',
          },
        },
      ],
    ],
  }
}
