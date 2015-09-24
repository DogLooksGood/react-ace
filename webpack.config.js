var path = require('path');
var webpack = require('webpack');

module.exports = {
	entry: './index.js',
	output: {
		filename: 'ace.min.js',
		path: path.join(__dirname, 'dist')
	},
	module: {
		loaders: [
			{ test: /\.js$/, loader: 'babel', exclude: /node_modules/ }
		]
	}
}
