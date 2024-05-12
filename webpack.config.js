// webpack.config.js

const path = require("path");

module.exports = {
  entry: "./src/index.js", // Entry point of your application
  output: {
    path: path.resolve(__dirname, "dist"), // Output directory
    filename: "bundle.js", // Output bundle file name
  },
  module: {
    rules: [
      {
        test: /\.js$/, // Apply this rule to .js files
        exclude: /node_modules/, // Don't apply to files in node_modules
        use: {
          loader: "babel-loader", // Use Babel to transpile JavaScript files
          options: {
            presets: ["@babel/preset-env"], // Use the @babel/preset-env preset
          },
        },
      },
    ],
  },
  devServer: {
    allowedHosts: ["localhost"], // Allow localhost access to dev server
    contentBase: path.join(__dirname, "public"), // Serve content from public directory
    port: 3000, // Specify port for dev server
  },
};
