const { src, dest, series, parallel, lastRun } = require('gulp');
const { argv } = require('yargs');
const autoprefixer = require('autoprefixer');
const babelify = require('babelify');
const browserSync = require('browser-sync');
const browserify = require('browserify');
const compress = require('compression');
const del = require('del');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const terser = require('gulp-terser');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

const server = browserSync.create();
const port = argv.port || 8000;


/**
 * Delete working directories
 */
function clean() {
  return del([ 'dist' ])
}


/**
 * Optimize stylesheets
 */
function styles() {
  return src('app/styles/*.scss')             // Specify file locations
    .pipe(plumber())                          // Prevent pipe breaking
    .pipe(sourcemaps.init())                  // Initialize our sourcemaps
    .pipe(sass.sync({                 // Convert SASS files to CSS
      outputStyle: 'compressed',
      precision: 10,
      includePaths: ['.']
    })
    .on('error', sass.logError))
    .pipe(postcss([ autoprefixer() ]))        // Add browser-specific prefixes where needed
    .pipe(sourcemaps.write())                 // Update sourcemaps
    .pipe(dest('dist/styles'));                // Write resulting stylesheet to dist directory
}


/**
 * Optimize javascript files
 */
function main_scripts() {
  return browserify(
      [
        'app/scripts/converter/image-converter.js',
        'app/scripts/converter/image-detail-converter.js',
        'app/scripts/converter/lat-lng-converter.js',
        'app/scripts/converter/operating-hours-converter.js',
        'app/scripts/converter/new-review-converter.js',
        'app/scripts/converter/restaurant-converter.js',
        'app/scripts/converter/review-converter.js',
        'app/scripts/converter/sync-favorite-converter.js',
        'app/scripts/converter/sync-review-converter.js',
        'app/scripts/lib/assert.js',
        'app/scripts/lib/converter.js',
        'app/scripts/model/image.js',
        'app/scripts/model/image-detail.js',
        'app/scripts/model/lat-lng.js',
        'app/scripts/model/operating-hours.js',
        'app/scripts/model/restaurant.js',
        'app/scripts/model/review.js',
        'app/scripts/model/sync-favorite.js',
        'app/scripts/model/sync-review.js',
        'app/scripts/proxy/idb-proxy.js',
        'app/scripts/proxy/idb-proxy-agent.js',
        'app/scripts/proxy/server-proxy.js',
        'app/scripts/proxy/server-proxy-agent.js',
        'app/scripts/service/image-service.js',
        'app/scripts/service/map-service.js',
        'app/scripts/service/network-monitor.js',
        'app/scripts/service/restaurant-service.js',
        'app/scripts/main.js',
        'app/service-worker-bootstrap.js',
        './app/service-worker.js'
      ],
      {debug: true}
    )
    .transform(babelify.configure({ "babelrc": true }))
    .bundle()
    .pipe(source('main_bundle.js'))
    .pipe(buffer())
    .pipe(plumber())                                        // Prevent pipe breaking
    .pipe(sourcemaps.init())                                // Initialize our sourcemaps
//    .pipe(terser())                                         // Minify our javascript
    .pipe(sourcemaps.write('.'))                            // Update our sourcemaps
    .pipe(dest('dist/scripts'));                             // Save results to dist directory
}
function restaurant_scripts() {
  return browserify(
      [
        'app/scripts/converter/image-converter.js',
        'app/scripts/converter/image-detail-converter.js',
        'app/scripts/converter/lat-lng-converter.js',
        'app/scripts/converter/operating-hours-converter.js',
        'app/scripts/converter/new-review-converter.js',
        'app/scripts/converter/restaurant-converter.js',
        'app/scripts/converter/review-converter.js',
        'app/scripts/converter/sync-favorite-converter.js',
        'app/scripts/converter/sync-review-converter.js',
        'app/scripts/lib/assert.js',
        'app/scripts/lib/converter.js',
        'app/scripts/lib/hash.js',
        'app/scripts/model/image.js',
        'app/scripts/model/image-detail.js',
        'app/scripts/model/lat-lng.js',
        'app/scripts/model/new-review.js',
        'app/scripts/model/operating-hours.js',
        'app/scripts/model/restaurant.js',
        'app/scripts/model/review.js',
        'app/scripts/model/sync-favorite.js',
        'app/scripts/model/sync-review.js',
        'app/scripts/proxy/idb-proxy.js',
        'app/scripts/proxy/idb-proxy-agent.js',
        'app/scripts/proxy/server-proxy.js',
        'app/scripts/proxy/server-proxy-agent.js',
        'app/scripts/service/image-service.js',
        'app/scripts/service/map-service.js',
        'app/scripts/service/network-monitor.js',
        'app/scripts/service/restaurant-service.js',
        'app/scripts/service/review-service.js',
        'app/scripts/restaurant_info.js',
        'app/service-worker-bootstrap.js',
        './app/service-worker.js'
      ],
      { debug: true }
    )
    .transform(babelify.configure({ "babelrc": true }))
    .bundle()
    .pipe(source('restaurant_bundle.js'))
    .pipe(buffer())
    .pipe(plumber())                                        // Prevent pipe breaking
    .pipe(sourcemaps.init())                                // Initialize our sourcemaps
//    .pipe(terser())                                         // Minify our javascript
    .pipe(sourcemaps.write('.'))                            // Update our sourcemaps
    .pipe(dest('dist/scripts'));                            // Save results to dist directory
}
scripts = series(main_scripts, restaurant_scripts);


/**
 * Optimize HTML files
 */
function html() {
  return src('app/*.html')                            // Specify file locations
    // .pipe(htmlmin({                           // Minify the HTML
    //   collapseWhitespace: true,
    //   minifyCSS: true,
    //   minifyJS: {compress: {drop_console: true}},
    //   processConditionalComments: true,
    //   removeComments: true,
    //   removeEmptyAttributes: true,
    //   removeScriptTypeAttributes: true,
    //   removeStyleLinkTypeAttributes: true             // Save resulting files in the dist directory
    // }))
    .pipe(dest('dist'));
}


/**
 * Optimize images
 */
function images() {
  return src('app/images/**/*', { since: lastRun(images) })     // Specify file locations
    .pipe(imagemin())                                           // Minify them
    .pipe(dest('dist/images'));                                 // And write results to dist directory
}


/**
 * Move all other files to dist (ex:  manifest.json, favicon.ico, robots.txt)
 */
function extras() {
  return src([ 'app/*', '!app/*.html' ], { dot: true })     // File all other files in the 'app' folder
    .pipe(dest('dist'));                                    // And move them into dist directory
}


/**
 * Starts the distribution server
 */
function startDistServer() {
  server.init({
    notify: false,
    port,
    server: {
      baseDir: 'dist',
      middleware: [ compress() ],
      routes: {
        '/node_modules': 'node_modules'
      }
    }
  });
}


/**
 * Define the two commands that we'll use during development and production -- i.e. build and serve
 */
let build = series(
  clean,
  parallel(
    series(parallel(styles, scripts), html),
    images,
    extras
  )
);
let serve = series(build, startDistServer);


/**
 * Export the three commands that people using this script can invoke
 */
exports.build = build;
exports.serve = serve;
exports.default = build;
