const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
		mode: "development",
		entry: {
			main: "./src/js/index.js",
			install: "./src/js/install.js",
		},
		output: {
			filename: "[name].bundle.js",
			path: path.resolve(__dirname, "dist"),
		},
		plugins: [
			// html plugin to inject bundles
			new HtmlWebpackPlugin({
				template: "./index.html",
				title: "Jate",
			}),
			// service-worker
			new InjectManifest({
				swSrc: "./src-sw.js",
				swDest: "src-sw.js",
			}),
			// manifest.json
			new WebpackPwaManifest({
				// allows logo to be inserted properly
				fingerprints: false,
				inject: true,
				name: "Text Editor",
				short_name: "Jate",
				description: "Keep track of texts!",
				// background_color: "#7eb4e2",
				// theme_color: "#7eb4e2",
				start_url: "/",
				publicPath: "/",
				icons: [
					{
						src: path.resolve("src/images/logo.png"),
						sizes: [96, 128, 192, 256, 384, 512],
						destination: path.join("assets", "icons"),
					},
				],
			}),
		],

		module: {
			rules: [
				// css loader
				{
					test: /\.css$/i,
					use: ["style-loader", "css-loader"],
				},
				// babel
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
						options: {
							presets: ["@babel/preset-env"],
							plugins: [
								"@babel/plugin-proposal-object-rest-spread",
								"@babel/transform-runtime",
							],
						},
					},
				},
			],
		},
	};
};
