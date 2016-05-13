'use strict';

var path = require('path');

module.exports = {
	context: __dirname,
	entry: path.join(__dirname, 'src', 'index.jsx'),
	output: {
		path: 'www',
		filename: 'bundle.js'
	},
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
