// const webpack = require("webpack");
const {/*addBabelPlugin, */ override, overrideDevServer, addLessLoader, addWebpackAlias} = require("customize-cra");
const path = require("path");
const paths = require("react-scripts/config/paths");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

const isLocal = process.env.REACT_APP_ENV === "local";
const isProd = (process.env.REACT_APP_ENV === "preview" || process.env.REACT_APP_ENV === "production");
console.log("isLocal: ", isLocal);
console.log("isProd: ", isProd);

// function resolve(dir) {
//     return path.join(__dirname, ".", dir);
// }

const addCustomize = () => (config) => {
    if (!isLocal) {
        // 关闭sourceMap
        config.devtool = false;
        paths.appBuild = path.join(path.dirname(paths.appBuild), "dist");
        config.output.path = path.join(path.dirname(config.output.path), "dist");
        //正式修改
        // config.output.publicPath = publicPaths[process.env.REACT_APP_ENV];
    }
    config.resolve = {
        extensions: [".js", ".ts", ".tsx", ".jsx"],
    };

    return config;
};

const addPlugins = () => (config) => {
    if (isProd) {
        config.plugins.push(new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    drop_console: true
                }
            }
        }));
    }
    return config;
};

const devServerConfig = () => (config) => {
    return {
        ...config,
        host: 'localhost',
        port: 3000, // 服务器启动端口
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, redirect-url,serviceId,staffname,staffid",
            "Access-Control-Allow-Methods": "PUT,POST,GET,DELETE,OPTIONS",
            "Content-Type": "text/html;charset=UTF-8"
        },
        historyApiFallback: true,
        hot: true, // 开启HMR热更新
        compress: true,  // 开启Gzip压缩
        proxy: {
            contentBase: './dist', // 服务器静态资源文件夹
            '/api': {
                target: 'http://localhost:18090/', // 我们要代理的真实接口地址
                changeOrigin: true, // 允许跨域
            },
        }
    };
};

// const removeConsole = () => {
//     addBabelPlugin(["transform-remove-console", {exclude: ["error", "warn"]}]);
// };

module.exports = {
    webpack: override(
        addCustomize(),
        addPlugins(),
        // removeConsole(),
        // 使用less-loader
        addLessLoader(),
        //增加路径别名的处理
        addWebpackAlias({
            ["@"]: path.resolve(__dirname, "./src"),
        }),
    ),
    devServer: overrideDevServer(devServerConfig())
};
