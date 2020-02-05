const path = require('path');
const fs = require('fs'); 
const HtmlWebpackPlugin = require('html-webpack-plugin');

//const appDirectory holds the path of the App directory 
const appDirectory = fs.realpathSync(process.cwd());

//const resolveAppPath retrieves the absolute path of the file/directory within the app directory
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath)

//host
const host = process.env.HOST || 'localhost'; 

//required for babel-preset-react-app
process.env.NODE_ENV = 'development';

module.exports = {
    //environment mode 
    mode: "development", 

    //entry point of the app 
    entry: resolveAppPath('src'), 

    //development filename output 
    output: {
        filename: 'static/js/bundle.js',
    }, 
    devServer: {
        //tells Webpack to serve index.html created in the public directory as the base 
        contentBase: resolveAppPath('public'), 

        compress: true, 

        hot: true, 

        host,

        port: 3000, 

        publicPath: '/'

    }, 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/, 
                exclude: /node_modules/,
                include: resolveAppPath('src'), 
                loader: 'babel-loader', 
                options: {
                    presets: [
                        require.resolve('babel-preset-react-app'),
                    ]
                }
            }
        ],
    },
    // Injects the base index.html in public with a script tag. 
    // The source of the script tag is the filename output above, static/js/bundle.js
    plugins: [
        new HtmlWebpackPlugin({
            inject: true, 
            template: resolveAppPath('public/index.html')
        }), 
    ], 

}