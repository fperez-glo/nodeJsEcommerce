import path, { dirname }  from 'path';
import { fileURLToPath } from 'url';
import nodeExternals from 'webpack-node-externals';
//Este plugin se utiliza para arrancar el servidor ni bien compila el productivo.
import NodemonPlugin from 'nodemon-webpack-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

//console.log('rooot:',path.resolve(__dirname, 'dist'))
export default {
    entry: './main.js',
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
    // plugins: [
    //     new NodemonPlugin(),
    // ],
};