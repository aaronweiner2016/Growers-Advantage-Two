const paths = require('./paths'),
      mix = require('laravel-mix'),
      copyWatched = require('laravel-mix-copy-watched'),
      njk = require('laravel-mix-nunjucks'),
      RemovePlugin = require('remove-files-webpack-plugin'),
      MinifyHtmlWebpackPlugin = require('minify-html-webpack-plugin');
      
mix
    // Laravel Mix options
    .options({
        clearConsole: false,
        processCssUrls: false,
        cssNano: {
            svgo: false
        }
    })
    .disableSuccessNotifications()
    // BrowserSync init
    .browserSync({
        host: 'localhost',
        port: 3000,
        proxy: false,
        server: {
            baseDir: paths.base.dir
        },
        files: [
            '**/*.njk',
            '**/*.html',
            '**/*.js',
            '**/*.css'
        ]
    })
    // Render Nunjucks templates
    .njk(paths.src.templates, (mix.inProduction() ? paths.dist.base : paths.temp.base), {
        data: {
            ...(require('./data.json')),
            environment: mix.inProduction() ? 'production' : 'development'
        },
        envOptions: {
            lstripBlocks: true,
            autoescape: true,
            trimBlocks: true
        }
    })
    // Render Nunjucks templates for Documentation
    .njk(paths.src.docs, (mix.inProduction() ? paths.dist.docs : paths.temp.docs), {
        data: {
            ...(require('./data.json')),
            environment: mix.inProduction() ? 'production' : 'development'
        },
        envOptions: {
            lstripBlocks: true,
            autoescape: true,
            trimBlocks: true
        }
    })
    // Delete all target directory
    .webpackConfig({
        plugins: [
            new RemovePlugin({
                before: {
                    include: [
                        mix.inProduction() ? paths.dist.base : paths.temp.base
                    ]
                }
            })
        ]
    });

if (mix.inProduction()) {
    // Production mode
    mix
        // Copy plugins
        .copyDirectory(paths.base.node + '/swiper', paths.dist.vendor + '/swiper')
        .copyDirectory(paths.base.node + '/photoswipe', paths.dist.vendor + '/photoswipe')
        .copyDirectory(paths.base.node + '/smooth-scroll', paths.dist.vendor + '/smooth-scroll')
        .copyDirectory(paths.base.node + '/typed.js', paths.dist.vendor + '/typed.js')
        .copyDirectory(paths.base.node + '/cookieconsent', paths.dist.vendor + '/cookieconsent')
        .copyDirectory(paths.base.node + '/sticky-js', paths.dist.vendor + '/sticky-js')
        .copyDirectory(paths.base.node + '/countup.js', paths.dist.vendor + '/countup.js')
        .copyDirectory(paths.base.node + '/jarallax', paths.dist.vendor + '/jarallax')
        .copyDirectory(paths.base.node + '/imagesloaded', paths.dist.vendor + '/imagesloaded')
        .copyDirectory(paths.base.node + '/isotope-layout', paths.dist.vendor + '/isotope-layout')
        
        // Compile JS file
        .babel(paths.src.js + '/theme.js', paths.dist.js + '/theme.min.js')
        // Concat, compile and minify JS core files
        .babel([
            paths.base.node + '/bluebird/js/browser/bluebird.min.js',
            paths.base.node + '/aos/dist/aos.js',
            paths.base.node + '/whatwg-fetch/dist/fetch.umd.js',
            paths.base.node + '/string-includes-polyfill/string-includes-polyfill.js',
            paths.base.node + '/number.isnan/isnan.js',
            paths.base.node + '/fetch-inject/dist/fetch-inject.js',
            paths.base.node + '/jquery/dist/jquery.min.js',
            paths.base.node + '/bootstrap/dist/js/bootstrap.bundle.min.js'
        ], paths.dist.js + '/theme.core.min.js')

        // Concat, compile and minify CSS files
        .sass(paths.src.scss + '/theme.scss', paths.dist.css + '/theme.min.css')

        // Copy images
        .copyDirectory(paths.src.images, paths.dist.images)
        // Minify HTML files
        .webpackConfig({
            plugins: [
                new MinifyHtmlWebpackPlugin({
                    afterBuild: true,
                    src: paths.dist.base,
                    dest: paths.dist.base,
                    ignoreFileNameRegex: /assets/,
                    rules: {
                        collapseBooleanAttributes: true,
                        collapseWhitespace: true,
                        removeAttributeQuotes: true,
                        removeComments: true
                    }
                })
            ]
        })

        // For documentation
        .sass(paths.src.scss + '/docs.scss', paths.dist.docs + "/assets/css/docs.min.css");
} else {
    // Development and default mode
    mix
        // Copy plugins
        .copyDirectory(paths.base.node + '/swiper', paths.temp.vendor + '/swiper')
        .copyDirectory(paths.base.node + '/photoswipe', paths.temp.vendor + '/photoswipe')
        .copyDirectory(paths.base.node + '/smooth-scroll', paths.temp.vendor + '/smooth-scroll')
        .copyDirectory(paths.base.node + '/typed.js', paths.temp.vendor + '/typed.js')
        .copyDirectory(paths.base.node + '/cookieconsent', paths.temp.vendor + '/cookieconsent')
        .copyDirectory(paths.base.node + '/sticky-js', paths.temp.vendor + '/sticky-js')
        .copyDirectory(paths.base.node + '/countup.js', paths.temp.vendor + '/countup.js')
        .copyDirectory(paths.base.node + '/jarallax', paths.temp.vendor + '/jarallax')
        .copyDirectory(paths.base.node + '/imagesloaded', paths.temp.vendor + '/imagesloaded')
        .copyDirectory(paths.base.node + '/isotope-layout', paths.temp.vendor + '/isotope-layout')

        // Compile JS file
        .babel(paths.src.js + '/theme.js', paths.temp.js + '/theme.js')
        // Concat and compile JS core files
        .babel([
            paths.base.node + '/bluebird/js/browser/bluebird.min.js',
            paths.base.node + '/aos/dist/aos.js',
            paths.base.node + '/whatwg-fetch/dist/fetch.umd.js',
            paths.base.node + '/string-includes-polyfill/string-includes-polyfill.js',
            paths.base.node + '/number.isnan/isnan.js',
            paths.base.node + '/fetch-inject/dist/fetch-inject.js',
            paths.base.node + '/jquery/dist/jquery.min.js',
            paths.base.node + '/bootstrap/dist/js/bootstrap.bundle.min.js'
        ], paths.temp.js + '/theme.core.js')

        // Concat and compile CSS files
        .sass(paths.src.scss + '/theme.scss', paths.temp.css + '/theme.css')

        // Watch and copy images
        .copyWatched(paths.src.images + '/**/*', paths.temp.images, {base: 'src/images'})
        
        // Generate sourcemap file
        .webpackConfig({
            devtool: 'source-map'
        })

        // For documentation
        .sass(paths.src.scss + '/docs.scss', paths.temp.docs + "/assets/css/docs.css");
}