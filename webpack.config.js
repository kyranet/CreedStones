module.exports = {
	mode: 'production',
	devtool: 'inline-source-map',
	entry: './src/lib/main.ts',
	output: {
		path: `${__dirname}/dist/js/`,
		filename: 'bundle.min.js'
	},
	resolve: {
		// Add `.ts` and `.tsx` as a resolvable extension.
		extensions: ['.ts', '.tsx', '.js']
	},
	module: {
		rules: [
			// all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
			{ test: /\.tsx?$/, loader: 'ts-loader' }
		]
	}
}
