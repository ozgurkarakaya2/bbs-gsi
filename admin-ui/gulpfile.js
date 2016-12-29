var gulp = require('gulp'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    changed = require('gulp-changed'),
    rev = require('gulp-rev'),
    browserSync = require('browser-sync'),
    sass = require('gulp-ruby-sass'),
    ngannotate = require('gulp-ng-annotate'),
    useref = require('gulp-useref'),
    gulpclean = require('gulp-clean'),
    del = require('del');

var DEST = './build/';

gulp.task('jshint', function() {
    gulp.src('app/scripts/controllers/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
    gulp.src('app/scripts/services/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
    return gulp.src('app/scripts/app.js')
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));

});

// Clean all files
gulp.task('clean', function() {
    return del([DEST]);
});

// Default task
gulp.task('default', ['clean'], function() {
    gulp.start('usemin','imagemin','copyfonts','copyviews','copyscripts');
});

gulp.task('usemin',['jshint'], function () {
    return gulp.src('app/index.html')
        .pipe(usemin({
            css:[minifycss()],
            js: [ngannotate(),uglify()]
        }))
        .pipe(gulp.dest(DEST));
});

gulp.task('copyviews',['clean'], function() {
    gulp.src(['app/views/subscribers.html'])
        .pipe(gulp.dest(DEST+'/views'));
});

gulp.task('copyscripts', function() {
    gulp.src(['app/scripts/js/custom.min.js'])
        .pipe(gulp.dest(DEST+'/scripts'));
});

// Images
gulp.task('imagemin', function() {
    return del([DEST + '/img']), gulp.src('app/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest(DEST + '/img'));
        // .pipe(notify({ message: 'Images task complete' }));
});

gulp.task('copyfonts', ['clean'], function() {
    gulp.src('app/vendors/font-awesome/fonts/**/*.{ttf,woff,eof,svg,css}*')
        .pipe(gulp.dest(DEST+'/fonts'));
    gulp.src('app/vendors/bootstrap/dist/fonts/**/*.{ttf,woff,eof,svg,css}*')
        .pipe(gulp.dest(DEST+'/fonts'));
});

// Watch
gulp.task('watch', ['browser-sync'], function() {
    // Watch .js files
    gulp.watch('{app/scripts/**/*.js,app/styles/**/*.css,app/views/**/*.html}', ['usemin']);
    // Watch image files
    gulp.watch('app/img/**/*', ['imagemin']);
});

gulp.task('browser-sync', ['default'], function () {
    var files = [
        'app/views/**/*.html',
        'app/styles/*.scss',
        'app/img/*',
        'app/scripts/**/*.js',
        'dist/**/*'
    ];

    browserSync.init(files, {
        server: {
            baseDir: DEST,
            index: "index.html"
        }
    });
    // Watch any files in dist/, reload on change
    gulp.watch(['build/**']).on('change', browserSync.reload);
});



