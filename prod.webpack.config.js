'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
	context: __dirname,
	entry: path.join(__dirname, 'src', 'index.jsx'),
	output: {
		path: 'www',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify('production')
			}
		}),
		new webpack.optimize.UglifyJsPlugin()
	],
	module: {
		loaders: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: 'babel',
				query: {
					presets: ['react', 'es2015']
				}
			}
		]
	}
};
