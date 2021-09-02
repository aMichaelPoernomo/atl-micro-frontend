const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

module.exports = {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: { path: path.join(__dirname, 'build'), filename: 'index.bundle.js' },
  mode: process.env.NODE_ENV || 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'src'),
    },
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
    }),
    new ModuleFederationPlugin({
      name: 'moduleHost1', // Will be used as the entry name
      filename: 'moduleHost1.js', // Output filename
      exposes: {
        // Expose the component for client app
        './Header': './src/components/Header',
        './Body': './src/components/Body',
      },
      // This library will be imported if the client app doesn’t have it.
      shared: {
        react: { singleton: true, requiredVersion: '^17.0.2', eager: true },
        'react-dom': { singleton: true, requiredVersion: '^17.0.2', eager: true },
      },
    }),
  ],
}
