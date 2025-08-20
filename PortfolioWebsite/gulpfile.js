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
const replace = require('gulp-replace');
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

// Copy .NET build output (if exists)
function copyDotNetBuild() {
    return gulp.src([
        'bin/**/*',
        'obj/**/*'
    ], { base: '.', allowEmpty: true })
    .pipe(gulp.dest(paths.dist.root));
}

// Copy static assets (excluding files that will be processed separately)
function copyStaticAssets() {
    return gulp.src([
        'wwwroot/**/*',
        '!wwwroot/css/**/*.css',
        '!wwwroot/js/**/*.js',
        '!wwwroot/images/**/*',
        '!wwwroot/index.html'
    ], { base: 'wwwroot' })
    .pipe(gulp.dest(paths.dist.html));
}

// Copy CSS files (unprocessed for GitHub Pages)
function copyCSS() {
    return gulp.src(paths.src.css)
        .pipe(gulp.dest(paths.dist.css));
}

// Copy JavaScript files (unprocessed for GitHub Pages)
function copyJS() {
    return gulp.src(paths.src.js)
        .pipe(gulp.dest(paths.dist.js));
}

// Process CSS files
function processCSS() {
    return gulp.src(paths.src.css)
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            cascade: false,
            overrideBrowserslist: ['last 2 versions', '> 1%', 'IE 11']
        }))
        .pipe(cleanCSS({
            level: {
                1: {
                    all: true,
                    normalizeUrls: false
                },
                2: {
                    all: true,
                    mergeMedia: true,
                    mergeNonAdjacentRules: true,
                    removeDuplicateFontRules: true,
                    removeDuplicateMediaBlocks: true,
                    removeDuplicateRules: true,
                    removeEmpty: true,
                    removeUnusedAtRules: true
                }
            },
            format: 'keep-breaks',
            inline: ['none']
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
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.info', 'console.debug']
            },
            mangle: true,
            output: {
                comments: false
            }
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.dist.js));
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

// Generate settings.json from environment variables
function generateSettings() {
    const settings = {
        emailjs: {
            serviceId: process.env.EMAILJS_SERVICE_ID || '',
            templateId: process.env.EMAILJS_TEMPLATE_ID || '',
            userId: process.env.EMAILJS_USER_ID || ''
        },
        contact: {
            recipientName: 'Marcus Henriques',
            recipientEmail: process.env.CONTACT_EMAIL || ''
        },
        app: {
            name: 'Marcus Henriques Portfolio',
            version: '1.0.0',
            environment: 'production'
        }
    };

    return gulp.src(paths.src.settings)
        .pipe(jsonEditor(settings))
        .pipe(rename('settings.json'))
        .pipe(gulp.dest(paths.dist.html));
}

// Process HTML for deployment (update base href for GitHub Pages)
function processHTMLForDeployment() {
    return gulp.src(paths.src.html)
        .pipe(replace('<base href="/" />', '<base href="/Portfolio-Project/" />'))
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: false,
            minifyJS: false
        }))
        .pipe(gulp.dest(paths.dist.html));
}

// Process 404.html for deployment (update redirect path for GitHub Pages)
function process404ForDeployment() {
    return gulp.src('wwwroot/404.html')
        .pipe(replace("window.location.href = '/';", "window.location.href = '/Portfolio-Project/';"))
        .pipe(gulp.dest(paths.dist.html));
}

// Process HTML for local development
function processHTML() {
    return gulp.src(paths.src.html)
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
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

// Update HTML to reference minified files
function updateHTMLReferences() {
    return gulp.src(paths.dist.html + '/index.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true,
            minifyCSS: true,
            minifyJS: true,
            removeEmptyAttributes: true,
            removeRedundantAttributes: true,
            removeScriptTypeAttributes: true,
            removeStyleLinkTypeAttributes: true,
            useShortDoctype: true
        }))
        .pipe(gulp.dest(paths.dist.html));
}

// Replace file references with minified versions
function replaceFileReferences() {
    return gulp.src(paths.dist.html + '/index.html')
        .pipe(replace('.css', '.min.css'))
        .pipe(replace('.js', '.min.js'))
        .pipe(gulp.dest(paths.dist.html));
}

// Build .NET Blazor application for GitHub Pages
function buildBlazor() {
    return new Promise((resolve, reject) => {
        const { execSync } = require('child_process');
        try {
            console.log('Building Blazor WebAssembly application for GitHub Pages...');
            // Build for GitHub Pages (public path will be /repo-name/)
            execSync('dotnet publish -c Release -o ./dist', { stdio: 'inherit' });
            console.log('Blazor build completed successfully');
            resolve();
        } catch (error) {
            console.error('Blazor build failed:', error.message);
            reject(error);
        }
    });
}

// Ensure .nojekyll file is copied to dist
function copyNojekyll() {
    return gulp.src('wwwroot/.nojekyll')
        .pipe(gulp.dest('dist/wwwroot'));
}

// Build task for local development (doesn't interfere with dotnet run)
const build = gulp.series(
    clean,
    copyStaticAssets,
    processCSS,
    processJS,
    optimizeImages,
    processHTML,
    generateSettings
);

// Build task for GitHub Pages (preserves Blazor output and copies assets)
const buildForPages = gulp.series(
    clean,
    buildBlazor,
    copyCSS,
    copyJS,
    processHTMLForDeployment,
    process404ForDeployment,
    generateSettings,
    copyNojekyll
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
exports.buildForPages = buildForPages;
exports.watch = gulp.series(build, watch);
exports.deploy = gulp.series(build, deploy);
exports.default = build;
