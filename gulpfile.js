'use strict';

// Gulp task variables
let paths =             require('./paths'),
    autoprefixer =      require('gulp-autoprefixer'),
    browserSync =       require('browser-sync').create(),
    cleanCss =          require('gulp-clean-css'),
    del =               require('del'),
    gulp =              require('gulp'),
    concat =            require('gulp-concat'),
    postcss =           require('gulp-postcss'),
    plumber =           require('gulp-plumber'),
    sass =              require('gulp-sass'),
    sourcemaps =        require('gulp-sourcemaps'),
    uglify =            require('gulp-uglify-es').default,
    babel =             require('gulp-babel'),
    rename =            require('gulp-rename'),
    wait =              require('gulp-wait'),
    extend =            require('extend'),
    parseArgs =         require('minimist'),
    nunjucksRender =    require('gulp-nunjucks-render'),
    data =              require('gulp-data'),
    gulpif =            require('gulp-if'),
    htmlmin =           require('gulp-htmlmin');
 


// Render Nunjucks templates
gulp.task('nunjucks', function(done) {
    return gulp
        .src(paths.src.templates + '/*.njk')
        // If you need subfolders too
        // .src([
        //     paths.src.templates + '/**/*.njk',
        //     '!' + paths.src.templates + '/layouts/*.njk',
        //     '!' + paths.src.templates + '/partials/*.njk'
        // ])
        .pipe(data(gulpif(config.env === 'production', {environment: 'production'}, {environment: 'development'})))
        .pipe(data(function() {
            return require('./data.json') 
        }))
        .pipe(nunjucksRender({
            path: paths.src.templates,
            envOptions: {
                lstripBlocks: true,
                autoescape: true,
                trimBlocks: true
            }
        }))
        .pipe(gulp.dest(gulpif(config.env === 'production', paths.dist.base, paths.temp.base)))
	done();
});

// Compile SCSS
gulp.task('compile:scss', function(done) {
    return gulp
        .src(paths.src.scss + '/theme.scss')
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            require('postcss-flexbugs-fixes')
        ]))
        .pipe(autoprefixer())
        .pipe(gulpif(config.env === 'development', sourcemaps.write('.')))
        .pipe(gulp.dest(gulpif(config.env === 'production', paths.dist.css, paths.temp.css)))
        .pipe(browserSync.reload({
            stream: true
        }))
    done();
});
  
// Minify CSS
gulp.task('minify:css', function(done) {
    return gulp
        .src(paths.dist.css + '/theme.css')
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.css), del([paths.dist.css + '/theme.css']))
    done();
});

// Concat JS core files
gulp.task('concat:js-core', function(done) {
	return gulp
		.src([
            paths.base.node + '/bluebird/js/browser/bluebird.min.js',
            paths.base.node + '/aos/dist/aos.js',
            paths.base.node + '/whatwg-fetch/dist/fetch.umd.js',
            paths.base.node + '/string-includes-polyfill/string-includes-polyfill.js',
            paths.base.node + '/number.isnan/isnan.js',
            paths.base.node + '/fetch-inject/dist/fetch-inject.min.js',
            paths.base.node + '/jquery/dist/jquery.min.js',
            paths.base.node + '/bootstrap/dist/js/bootstrap.bundle.min.js'
        ])
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('theme.core.js'))
        .pipe(gulpif(config.env === 'development', sourcemaps.write('.')))
        .pipe(gulp.dest(gulpif(config.env === 'production', paths.dist.js, paths.temp.js)))
	done();
});

// Compile JS file
gulp.task('compile:js', function (done) {
    return gulp
        .src(paths.src.js + '/theme.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .on('error', handleError)
        .pipe(gulpif(config.env === 'development', sourcemaps.write('.')))
        .pipe(gulp.dest(gulpif(config.env === 'production', paths.dist.js, paths.temp.js)))
        .pipe(browserSync.reload({
            stream: true
        }))
    done();
});
  
// Minify JS core files
gulp.task('minify:js-core', function(done) {
    return gulp
        .src(paths.dist.js + '/theme.core.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.js), del([paths.dist.js + '/theme.core.js']))
    done();
});

// Minify JS files
gulp.task('minify:js', function(done) {
    return gulp
        .src(paths.dist.js + '/theme.js')
        .pipe(plumber())
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.js), del([paths.dist.js + '/theme.js']))
    done();
});

// Copy images
gulp.task('copy:images', function(done) {
	return gulp
        .src(paths.src.images + '/**/*')
        .pipe(gulp.dest(gulpif(config.env === 'production', paths.dist.images, paths.temp.images)))
	done();
});

// Copy plugins
gulp.task('copy:plugins', function(done) {
    return gulp
        .src([
            paths.base.node + '/swiper*/**/*',
            paths.base.node + '/photoswipe*/**/*',
            paths.base.node + '/smooth-scroll*/**/*',
            paths.base.node + '/typed.js*/**/*',
            paths.base.node + '/cookieconsent*/**/*',
            paths.base.node + '/sticky-js*/**/*',
            paths.base.node + '/countup.js*/**/*',
            paths.base.node + '/jarallax*/**/*',
            paths.base.node + '/imagesloaded*/**/*',
            paths.base.node + '/isotope-layout*/**/*'
        ])
        .pipe(gulp.dest(gulpif(config.env === 'production', paths.dist.vendor, paths.temp.vendor)))
    done();
});

// Minify HTML files
gulp.task('minify:html', function(done) {
    return gulp
        .src(paths.dist.base + '/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.dist.base))
	done();
});

// Delete all target directory
gulp.task('delete:all', function(done) {
    return del([
        config.env === 'production' ? paths.dist.base : paths.temp.base
    ]);
    done();
});

// Delete css directory
gulp.task('delete:css', function(done) {
    return del([
        config.env === 'production' ? paths.dist.css + '/**/*.css' : paths.temp.css + '/**/*.css'
    ]);
    done();
});

// Delete js directory
gulp.task('delete:js', function(done) {
    return del([
        config.env === 'production' ? paths.dist.js + '/**/*.js' : paths.temp.js + '/**/*.js'
    ]);
    done();
});

// Delete plugins directory
gulp.task('delete:plugins', function(done) {
    return del([
        config.env === 'production' ? paths.dist.vendor : paths.temp.vendor
    ]);
    done();
});

// Render Nunjucks templates for Documentation
gulp.task('nunjucks:docs', function(done) {
    return gulp
        .src(paths.src.docs + '/*.njk')
        .pipe(data(gulpif(config.env === 'production', {environment: 'production'}, {environment: 'development'})))
        .pipe(data(function() {
            return require('./data.json') 
        }))
        .pipe(nunjucksRender({
            path: paths.src.docs,
            envOptions: {
                lstripBlocks: true,
                autoescape: true,
                trimBlocks: true
            }
        }))
        .pipe(gulp.dest(gulpif(config.env === 'production', paths.dist.docs, paths.temp.docs)))
	done();
});

// Compile SCSS for Documentation
gulp.task('compile:docs:scss', function(done) {
    return gulp
        .src(paths.src.scss + '/docs.scss')
        .pipe(wait(500))
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([
            require('postcss-flexbugs-fixes')
        ]))
        .pipe(autoprefixer())
        .pipe(gulpif(config.env === 'development', sourcemaps.write('.')))
        .pipe(gulp.dest(gulpif(config.env === 'production', paths.dist.docs + "/assets/css", paths.temp.docs + "/assets/css")))
    done();
});
  
// Minify CSS for Documentation
gulp.task('minify:docs:css', function(done) {
    return gulp
        .src(paths.dist.docs + "/assets/css/docs.css")
        .pipe(cleanCss())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(paths.dist.docs + "/assets/css"), del([paths.dist.docs + "/assets/css/docs.css"]))
    done();
});

// BrowserSync init
function browserSyncInit(done) {
	browserSync.init({
        host: 'localhost',
        port: 3000,
        proxy: false,
		server: {
            baseDir: paths.base.dir
        }
	});
	done();
}

// BrowserSync callback
function browserSyncReload(done) {
	browserSync.reload();
	done();
}

// Watch for changes
function watch() {
    gulp.watch(paths.src.templates + '/**/*.njk', gulp.series('nunjucks'));
    gulp.watch(paths.src.docs + '/**/*.njk', gulp.series('nunjucks'));
    gulp.watch(paths.src.scss + '/**/*.scss', gulp.series('compile:scss'));
    gulp.watch(paths.src.js + '/**/*.js' , gulp.series('compile:js'));
    gulp.watch(paths.src.images + '/**/*', gulp.series('copy:images'));
    gulp.watch(paths.temp.base + '/**/*.html', browserSyncReload);
};

// Error handling
function handleError (error) {
    console.log(error.toString());
    this.emit('end');
}

// Configuration
var config = extend({
    env: process.env.NODE_ENV
}, parseArgs(process.argv.slice(2)));


// Helper tasks
gulp.task('browserSync', gulp.series(browserSyncInit, watch));
gulp.task('css', gulp.series('compile:scss', 'minify:css', 'compile:docs:scss', 'minify:docs:css'));
gulp.task('js', gulp.series('concat:js-core', 'compile:js', 'minify:js-core', 'minify:js'));
gulp.task('set-dev-node-env', async function () {return process.env.NODE_ENV = config.env = 'development';});
gulp.task('set-prod-node-env', async function () {return process.env.NODE_ENV = config.env = 'production';});


// Default mode with watch
gulp.task('default', gulp.series('set-dev-node-env', 'delete:all', 'nunjucks', 'nunjucks:docs', 'copy:plugins', 'copy:images', 'compile:scss', 'concat:js-core', 'compile:js', 'compile:docs:scss', 'browserSync'));

// Development mode
gulp.task('dev', gulp.series('set-dev-node-env', 'delete:all', 'nunjucks', 'nunjucks:docs', 'copy:plugins', 'copy:images', 'compile:scss', 'concat:js-core', 'compile:js', 'compile:docs:scss'));

// Production mode
gulp.task('prod', gulp.series('set-prod-node-env', 'delete:all', 'nunjucks', 'nunjucks:docs', 'copy:plugins', 'copy:images', 'css', 'js', 'minify:html'));