const gulp = require('gulp');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const jsonEditor = require('gulp-json-editor');
const del = require('del');
const browserSync = require('browser-sync').create();

// Paths
const paths = {
    src: {
        css: 'wwwroot/css/**/*.css',
        js: 'wwwroot/js/**/*.js',
        images: 'wwwroot/images/**/*',
        html: 'wwwroot/index.html',
        settings: 'settings.template.json'
    },
    dist: {
        root: 'dist',
        css: 'dist/wwwroot/css',
        js: 'dist/wwwroot/js',
        images: 'dist/wwwroot/images',
        html: 'dist/wwwroot'
    }
};

// Clean dist directory
function clean() {
    return del([paths.dist.root]);
}

// Copy .NET build output
function copyDotNetBuild() {
    return gulp.src([
        'bin/**/*',
        'obj/**/*'
    ], { base: '.' })
    .pipe(gulp.dest(paths.dist.root));
}

// Copy static assets
function copyStaticAssets() {
    return gulp.src([
        'wwwroot/**/*',
        '!wwwroot/css/**/*.css',
        '!wwwroot/js/**/*.js',
        '!wwwroot/images/**/*'
    ])
    .pipe(gulp.dest(paths.dist.root));
}

// Process CSS files
function processCSS() {
    return gulp.src(paths.src.css)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(cleanCSS({
            level: 2,
            format: 'keep-breaks'
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist.css))
        .pipe(browserSync.stream());
}

// Process JavaScript files
function processJS() {
    return gulp.src(paths.src.js)
        .pipe(sourcemaps.init())
        .pipe(uglify({
            compress: {
                drop_console: true,
                drop_debugger: true
            }
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist.js))
        .pipe(browserSync.stream());
}

// Optimize images
function optimizeImages() {
    return gulp.src(paths.src.images)
        .pipe(imagemin([
            imagemin.gifsicle({ interlaced: true }),
            imagemin.mozjpeg({ quality: 75, progressive: true }),
            imagemin.optipng({ optimizationLevel: 5 }),
            imagemin.svgo({
                plugins: [
                    { removeViewBox: true },
                    { cleanupIDs: false }
                ]
            })
        ]))
        .pipe(gulp.dest(paths.dist.images));
}

// Process HTML
function processHTML() {
    return gulp.src(paths.src.html)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true
        }))
        .pipe(gulp.dest(paths.dist.html))
        .pipe(browserSync.stream());
}

// Generate settings.json from template
function generateSettings() {
    return gulp.src(paths.src.settings)
        .pipe(jsonEditor(function(json) {
            // Replace placeholders with environment variables or defaults
            return {
                emailjs: {
                    serviceId: process.env.EMAILJS_SERVICE_ID || '{{EMAILJS_SERVICE_ID}}',
                    templateId: process.env.EMAILJS_TEMPLATE_ID || '{{EMAILJS_TEMPLATE_ID}}',
                    userId: process.env.EMAILJS_USER_ID || '{{EMAILJS_USER_ID}}'
                },
                contact: {
                    recipientName: "Marcus Henriques",
                    recipientEmail: process.env.CONTACT_EMAIL || '{{CONTACT_EMAIL}}'
                },
                app: {
                    name: "Marcus Henriques Portfolio",
                    version: process.env.APP_VERSION || "1.0.0",
                    environment: process.env.ENVIRONMENT || "production"
                }
            };
        }))
        .pipe(rename('settings.json'))
        .pipe(gulp.dest(paths.dist.html));
}

// Update HTML to reference minified files
function updateHTMLReferences() {
    return gulp.src(paths.dist.html + '/index.html')
        .pipe(htmlmin({
            collapseWhitespace: false,
            removeComments: false,
            minifyCSS: false,
            minifyJS: false
        }))
        .pipe(gulp.dest(paths.dist.html));
}

// Watch for changes
function watch() {
    browserSync.init({
        server: {
            baseDir: paths.dist.root
        },
        port: 3000
    });

    gulp.watch(paths.src.css, processCSS);
    gulp.watch(paths.src.js, processJS);
    gulp.watch(paths.src.images, optimizeImages);
    gulp.watch(paths.src.html, processHTML);
    gulp.watch(paths.src.settings, generateSettings);
}

// Build task
const build = gulp.series(
    clean,
    gulp.parallel(
        copyStaticAssets,
        processCSS,
        processJS,
        optimizeImages,
        processHTML
    ),
    generateSettings
);

// Deploy task
function deploy() {
    console.log('🚀 Deployment package ready in dist/ directory');
    console.log('📦 Upload the contents of dist/ to Cloudflare Pages');
    return Promise.resolve();
}

// Export tasks
exports.clean = clean;
exports.build = build;
exports.watch = gulp.series(build, watch);
exports.deploy = gulp.series(build, deploy);
exports.default = build;
