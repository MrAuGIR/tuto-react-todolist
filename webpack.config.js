const path = require('path')

const webpack = require('webpack')

let config = {
    entry: './src/main.tsx',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        publicPath: '/dist/'
    },
    devServer: {
        static: './dist',
    },
    resolve: {
        extensions: ['.js','.ts','.tsx']
    },
    module:{
        rules: [
            {
                test: /\.tsx?/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: [
                      ['@babel/preset-env', { targets: "defaults" }]
                    ]
                  }
                }
            },
            {
                test: /\.tsx?/,
                loader: 'tslint-loader',
                enforce: 'pre',
                exclude: [/node_modules/]
            },
            {
                test: /\.tsx?/,
                loader: 'ts-loader',
                exclude: [/node_modules/]
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'proces.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV)
            }
        })
    ]
}

module.exports = config