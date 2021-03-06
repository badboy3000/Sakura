const path = require('path'),
  fs = require('fs'),
  
  webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CordovaHtmlOutputPlugin = require('./webpack/plugins/CordovaHtmlOutputPlugin.js'),
  UglifyJsPlugin = require('uglifyjs-webpack-plugin'),
  CleanPlugin = require('clean-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  StylelintPlugin = require('stylelint-webpack-plugin'),

entryFile = path.join(__dirname, 'src/main.js'),
  devServerPort = 8081

let config = function (env) {
  let returner = {
    entry: entryFile,
    
    resolve: {
      extensions: ['.js', '.json', '.vue', '.scss'],
      modules: [path.join(__dirname, 'src'), 'node_modules'],
      alias: {
        'vue$': 'vue/dist/vue.common.js',
        'src': path.resolve(__dirname, 'src/'),
        'env': path.resolve(__dirname, '.env.js'),
        'assets': path.resolve(__dirname, 'src/assets/'),
        'images': path.resolve(__dirname, 'src/assets/images/'),
        'styles': path.resolve(__dirname, 'src/assets/style/'),
        'vendor': path.resolve(__dirname, 'src/assets/js/'),
        'api': path.resolve(__dirname, 'src/api/'),
        'views': path.resolve(__dirname, 'src/views/'),
        'mixins': path.resolve(__dirname, 'src/mixins/'),
        'filters': path.resolve(__dirname, 'src/filters/'),
        'directives': path.resolve(__dirname, 'src/directives/'),
        'components': path.resolve(__dirname, 'src/components/')
      }
    },
    
    output: {
      pathinfo: true,
      devtoolLineToLine: true,
      filename: '[hash].[name].js',
      sourceMapFilename: "[hash].[name].js.map",
      path: path.join(__dirname, 'www')
    },
    
    module: {
      rules: [
        {
          test: /\.(png|jpg|gif|svg)$/,
          loader: 'url-loader',
          options: {
            name: '[path][name].[hash:8].[ext]'
          }
        },
        {
          test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
          loader: 'file-loader',
          options: {
            name: '[name].[hash:8].[ext]'
          }
        },
        {
          test: /\.scss$/,
          loader: ['vue-style-loader', 'css-loader', 'sass-loader']
        },
        {
          test: /\.sass$/,
          loader: [ 'vue-style-loader', 'css-loader', 'sass-loader?indentedSyntax']
        },
        {
          test: /\.vue$/, exclude: /node_modules/,
          loader: 'vue-loader',
          options: {
            loaders: {
              js: {
                loader: 'babel-loader'
              },
              scss: [
                'vue-style-loader',
                {
                  loader: 'css-loader',
                  options: {
                    minimize: true
                  }
                },
                'sass-loader',
                {
                  loader: 'sass-resources-loader',
                  options: {
                    resources: [
                      path.resolve(__dirname, 'src/assets/style/variables.scss'),
                      path.resolve(__dirname, 'src/assets/style/mixins.scss')
                    ]
                  }
                }
              ],
            }
          }
        },
        {
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules(\/|\\)(?!(framework7|framework7-vue|template7|dom7)(\/|\\)).*/
        }
      ]
    },
    
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
          API_HOST: JSON.stringify(process.env.API_HOST || 'https://api.calibur.tv/')
        }
      }),
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: 'src/index.html',
        inject: true,
        minify: {
          removeComments: true,
          removeScriptTypeAttributes: true,
          removeAttributeQuotes: true,
          useShortDoctype: true,
          decodeEntities: true,
          collapseWhitespace: true,
          minifyCSS: true
        }
      })
    ]
  }
  
  if (typeof env === 'undefined' || typeof env.devserver === 'undefined') {
    returner.plugins.push(new CordovaHtmlOutputPlugin())
    returner.plugins.push(new ExtractTextPlugin("styles.css"))
    returner.module.rules.push({
      test: /\.css$/, use: ExtractTextPlugin.extract({
        fallback: "style-loader",
        use: "css-loader"
      })
    })
  }
  
  if (env) {
    if (typeof env.devserver !== 'undefined' && env.devserver) {
      returner.module.rules.push({
        test: /\.css$/, loader: ['style-loader', 'css-loader']
      })
      returner.module.rules.push({
        test: /\.(js|vue)$/,
        use: {
          loader: 'eslint-loader',
          options: {
            enforce: 'pre',
            cacheDirectory: true
          }
        },
        exclude: /node_modules/
      })
      returner.entry = [
        entryFile,
        path.resolve(__dirname, "webpack/dev_helpers/CordovaDeviceRouter.js")
      ]
      returner.output.publicPath = "/"
      returner.devtool = "eval"
      returner.devServer = {
        contentBase: path.join(__dirname, "www"),
        port: devServerPort,
        stats: {colors: true},
        watchOptions: {
          aggregateTimeout: 300,
          poll: 100,
          ignored: /node_modules|platforms/,
        },
        headers: {
          "Access-Control-Allow-Origin": "*"
        },
        host: "0.0.0.0"
      }
      returner.plugins.push(new webpack.NamedModulesPlugin())
      // returner.plugins.push(new StylelintPlugin({
      //   files: ['**/*.vue']
      // }))
    } else if (typeof env.release !== 'undefined' && env.release) {
      returner.plugins.push(new CleanPlugin("www", {
        root: path.join(__dirname, "."),
        dry: false,
        verbose: false,
        exclude: ["index.html"]
      }))
      returner.plugins.push(new UglifyJsPlugin())
    }
  }
  
  return returner
}

module.exports = config
