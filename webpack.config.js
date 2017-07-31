module.exports = {
    entry: './assets/ts/app.tsx',
    output: {
        path: __dirname + '/assets/dist/',
        filename: 'app.bundle.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {test: /\.tsx?$/, use: 'ts-loader'}
        ]
    },
    externals: {
        React: 'react'
    }
}
