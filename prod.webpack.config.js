'use strict';

var webpack = require('webpack');
var prod = require('./webpack.config');

prod.plugins = [
	new webpack.DefinePlugin({
		'process.env': {
			'NODE_ENV': JSON.stringify('production')
		}
	}),
	new webpack.optimize.UglifyJsPlugin()
];

module.exports = prod;
