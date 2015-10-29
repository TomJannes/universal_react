var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require("webpack");

var assetsPath = path.join(__dirname, "..", "public", "assets");
var publicPath = "assets/";

var modulesPath = path.join(__dirname, '..', 'node_modules');
var reactDOMPath = path.join(modulesPath, 'react/lib/ReactDOM');
//var reactDOMPath = path.join(modulesPath, 'react/dist/react-with-addons.js');

var commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: "babel?cacheDirectory&stage=0",
    include: path.join(__dirname, "..",  "app")
  },
  {test: path.resolve(modulesPath, 'alt/dist/alt-with-addons.min.js'), loader: 'imports'},
  {test: path.resolve(modulesPath, 'react-router/umd/ReactRouter.min.js'), loader: 'imports'},
  { test: /\.png$/, loader: "url-loader" },
  { test: /\.jpg$/, loader: "file-loader" },
  { test: /\.html$/, loader: "html-loader" }
];

function getClientLoaders() {
  return commonLoaders;
}

var clientLoaders = getClientLoaders();

module.exports = [
  {
    // The configuration for the client
    name: "browser",
    /* The entry point of the bundle
     * Entry points for multi page app could be more complex
     * A good example of entry points would be:
     * entry: {
     *   pageA: "./pageA",
     *   pageB: "./pageB",
     *   pageC: "./pageC",
     *   adminPageA: "./adminPageA",
     *   adminPageB: "./adminPageB",
     *   adminPageC: "./adminPageC"
     * }
     *
     * We can then proceed to optimize what are the common chunks
     * plugins: [
     *  new CommonsChunkPlugin("admin-commons.js", ["adminPageA", "adminPageB"]),
     *  new CommonsChunkPlugin("common.js", ["pageA", "pageB", "admin-commons.js"], 2),
     *  new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]);
     * ]
     */
    context: path.join(__dirname, "..", "app"),
    entry: {
      app: "./client",
      common: ['react', 'react-router', 'react-dom', 'alt', 'immutable', 'jquery'],
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "[name].js",
      // The output path from the view of the Javascript
      publicPath: publicPath

    },
    devtool: "source-map",
    module: {
      /*preLoaders: [{
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loaders: ["eslint"]
      }],*/
      loaders: commonLoaders.concat([
				{ test: /\.css$/, loader: "style!css" }
			]),
      noParse: [
        //reactDOMPath,
        'react/dist/react-with-addons.js',
        'react-router/umd/ReactRouter.js',
        'alt/dist/alt-with-addons.js',
        'immutable/dist/immutable.js',
        'jquery/dist/jquery.js'
      ],
    },
    resolve: {
      extensions: ['', '.react.js', '.js', '.jsx', '.scss'],
      alias: {
        'react-dom': reactDOMPath,
        'react$': 'react/dist/react-with-addons.js',
        'react/addons': 'react/dist/react-with-addons.js',
        'react-router': 'react-router/umd/ReactRouter.js',
      },
      modulesDirectories: [
        "app", "node_modules"
      ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        // extract inline css from modules into separate files
        new ExtractTextPlugin("styles/main.css"),
        //new webpack.optimize.UglifyJsPlugin()
    ]
  }, {
    // The configuration for the server-side rendering
    name: "server-side rendering",
    context: path.join(__dirname, "..", "app"),
    entry: {
      app: "./server",
      header: "./elements/Header"
    },
    target: "node",
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: "[name].server.js",
      // The output path from the view of the Javascript
      publicPath: publicPath,
      libraryTarget: "commonjs2"
    },
    externals: [
      {
        'alt/AltContainer': true,
        'react/addons': true
      },
      /^[a-z\-0-9]+$/
    ],
    module: {
      loaders: commonLoaders.concat([
				{ test: /\.css$/,  loader: path.join(modulesPath, "style-collector-loader") + "!css-loader" },
			])
    },
    resolve: {
      extensions: ['', '.react.js', '.js', '.jsx', '.scss'],
      modulesDirectories: [
        "app", "node_modules"
      ]
    },
    plugins: [
        // extract inline css from modules into separate files
        new ExtractTextPlugin("styles/main.css")//,
        //new webpack.optimize.UglifyJsPlugin()
    ]
  }
];