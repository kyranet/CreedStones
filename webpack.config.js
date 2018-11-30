/* eslint-disable no-process-env, camelcase */
const path = require('path');
const webpack = require('webpack');
const TerserJSPlugin = require('terser-webpack-plugin');
const { version } = require('./package.json');

const production = process.env.NODE_ENV === 'production';
const filename = `creedstones${process.env.VERSIONED ? `.${version}` : ''}${production ? '.min' : ''}.js`;

module.exports = {
	entry: './src/js/main.js',
	mode: production ? 'production' : 'development',
	output: {
		path: path.resolve(__dirname, 'webpack'),
		filename,
		library: 'CreedStones',
		libraryTarget: 'umd'
	},
	module: {
		rules: [
			{ test: /\.md$/, loader: 'ignore-loader' },
			{
				test: require.resolve('./package.json'),
				type: 'javascript/auto',
				use: {
					loader: 'json-filter-loader',
					options: {
						used: ['version', 'homepage']
					}
				}
			}
		]
	},
	optimization: {
		minimizer: [
			new TerserJSPlugin({
				terserOptions: {
					mangle: { keep_classnames: true },
					compress: { keep_classnames: true },
					output: { comments: false }
				},
				parallel: true
			})
		]
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin()
	]
};
