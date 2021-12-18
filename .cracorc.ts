// @ts-ignore

const CracoLessPlugin = require('craco-less')

module.exports = {
  webpack: {
    configure: {
      module: {
        rules: [
          {
            type: 'javascript/auto',
            test: /\.mjs$/,
            use: [],
          },
        ],
      },
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#477FE7',
              '@border-radius-base': '5px',
              '@border-color-base': '#d9d9d9',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
}
