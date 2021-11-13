const path = require('path');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    target: 'node', //en orden, para ignorar los modulos/dependencias externas de terceros.
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader'
                },
            },
            //Otro loader para trabajar con archivos typescript (.ts) si esta bien seteado el entry apuntando a dicho archivo.
            {
                test: /\.tsx?/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'ts-loader'
                },
            },
        ]
    },
    plugins: [
        new NodemonPlugin(),
    ],
};