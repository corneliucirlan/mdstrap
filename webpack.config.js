const path = require('path'),
	webpack = require('webpack'),
	MiniCssExtractPlugin = require('mini-css-extract-plugin'),
	OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'),
	FixStyleOnlyEntriesPlugin = require("webpack-fix-style-only-entries"),
	StyleLintPlugin = require('stylelint-webpack-plugin'),
	UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
	context: __dirname,
	entry: {
		"dist/js/jquery-mdstrap": path.resolve(__dirname, 'src/js/jquery-mdstrap.js'),
		"dist/css/jquery-mdstrap": path.resolve(__dirname, 'src/css/_compile.sass'),
		"css/style": path.resolve(__dirname, 'src/css/style.sass'),
		"js/main": path.resolve(__dirname, 'src/js/main.js')
	},
	output: {
		path: path.resolve(__dirname),
		filename: '[name].js'
	},
	mode: 'development',
	devtool: 'source-map',
	devServer: {
		contentBase: './',
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				exclude: /node_modules/,
				test: /\.jsx$/,
				loader: 'eslint-loader'
			},
			{
				test: /\.jsx?$/,
				loader: 'babel-loader'
			},
			{
				test: /\.s?[ac]ss$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					'sass-loader'
				]
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: '[name].[ext]',
							outputPath: '`fonts/'
						}
					}
				]
			}
		]
	},
	plugins: [
		new FixStyleOnlyEntriesPlugin(),
		new StyleLintPlugin(),
		new MiniCssExtractPlugin({
			filename: '[name].css'
		}),
		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery"
		})
	],
	optimization: {
		minimizer: [
			new UglifyJsPlugin(),
			new OptimizeCssAssetsPlugin()
		]
	},
	externals: {
		jquery: 'jQuery'
	}
}