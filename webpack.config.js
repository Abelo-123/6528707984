module.exports = {
    module: {
        rules: [
            {
                test: /\.html$/,
                use: 'raw-loader', // or 'file-loader' if needed
            },
        ],
    },
};
