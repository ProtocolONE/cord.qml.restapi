var gulp = require('gulp'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    minimist = require('minimist'),
    del = require('del');

var src = [
            "src/license.js",
            "lib/*.js",
            "src/error.js",
            "src/request.js",
            "src/core.js",
            "src/commands/*.js"
        ],
releaseHeader = ["src/pragma"],
releaseFooter = [],
testHeader = ["src/testHeader"],
testFooter = ["src/testFooter"];


var options = minimist(process.argv.slice(2), {
    string: ['ver']
});

gulp.task('clean', function(cb) {
    del.sync(['build']);
    cb();
});

gulp.task('buildRelease', function(cb) {
    const releaseSrc = [...releaseHeader, ...src, ...releaseFooter];

    return gulp.src(releaseSrc)
        .pipe(concat('RestApi.js'))
        .pipe(replace(/@VERSION/g, options.ver))
        .pipe(gulp.dest('build'));
});

gulp.task('buildTest', function(cb) {
    const releaseSrc = [...testHeader, ...src, ...testFooter];

    return gulp.src(releaseSrc)
        .pipe(concat('RestApi.Test.js'))
        .pipe(replace(/@VERSION/g, options.ver))
        .pipe(gulp.dest('build'));
});


gulp.task('build', ['clean', 'buildRelease', 'buildTest']);

gulp.task('default', ['build']);
