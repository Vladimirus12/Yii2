const {override, fixBabelImports, addWebpackAlias} = require('customize-cra');
const path = require("path");

module.exports = override(
	fixBabelImports('import', {
		libraryName: 'antd',
		libraryDirectory: 'es',
		style: 'css',
	}),
	addWebpackAlias({
		["actions"]: path.resolve(__dirname, "src", "actions"),
		["api"]: path.resolve(__dirname, "src", "api"),
		["assets"]: path.resolve(__dirname, "src", "assets"),
		["components"]: path.resolve(__dirname, "src", "components"),
		["reducers"]: path.resolve(__dirname, "src", "reducers"),
		["routing"]: path.resolve(__dirname, "src", "routing"),
		["selectors"]: path.resolve(__dirname, "src", "selectors"),
		["store"]: path.resolve(__dirname, "src", "store"),
		["templates"]: path.resolve(__dirname, "src", "templates"),
		["utils"]: path.resolve(__dirname, "src", "utils"),
	}),
);
