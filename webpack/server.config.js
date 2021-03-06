const config = require('sapper/webpack/config.js');
const pkg = require('../package.json');

const preprocessOptions = require('./preprocess.config.js')

module.exports = {
	entry: config.server.entry(),
	output: config.server.output(),
	target: 'node',
	resolve: {
		extensions: ['.js', '.json', '.html'],
		mainFields: ['svelte', 'module', 'browser', 'main']
	},
	externals: Object.keys(pkg.dependencies),
	module: {
		rules: [
			{
        test: /\.(html|pug)$/,
				use: {
					loader: 'svelte-loader',
					options: {
            preprocess: require('svelte-preprocess')(preprocessOptions),
						css: false,
						generate: 'ssr'
					}
				}
			}
		]
	},
	mode: process.env.NODE_ENV,
	performance: {
		hints: false // it doesn't matter if server.js is large
	}
};