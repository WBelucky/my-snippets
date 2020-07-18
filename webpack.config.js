// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  mode: "development",
  entry: './src/index.ts',
  target: 'node',
  output: {
    path: path.join(__dirname, "/dist"),
    filename: "index.js"
  },
  resolve: {
    extensions: ['.ts', ".js"],
    modules: [path.join(__dirname, "src"), path.join(__dirname, "node_modules")],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
          exclude: /node_modules|snippets$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              configFile: "tsconfig.json",
              transpileOnly: true,
            }
          }
        ]
      }
    ]
  },
};
