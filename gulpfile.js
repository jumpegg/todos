var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var minifyhtml = require('gulp-minify-html');
var uglifycss = require('gulp-uglifycss');
var nodemon = require('gulp-nodemon');
var Filecache = require('gulp-file-cache');
var livereload = require('gulp-livereload');
var tsProject = ts.createProject('tsconfig.json');
var sourcemaps = require('gulp-sourcemaps');
var browserSync = require('browser-sync').create();

var fileCache = new Filecache();

gulp.task('browser-sync', function(){
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["client/**/*.*"],
        port: 7000,
    });
});

gulp.task('clean', function(){
    return del(['client/*']);
});

gulp.task('nodemon', function(){
    livereload.listen();
    return nodemon({
        script: 'server.js',
    }).on('start', function(){
        gulp.src('server.js')
            .pipe(livereload())
    })
});

gulp.task('system', function(){
    return gulp.src('angular/systemjs.config.js')
            .pipe(gulp.dest('client/'));
});

gulp.task('html', function(){
    return gulp.src('angular/**/*.html')
            .pipe(gulp.dest('client'))
});

gulp.task('css', function(){
    return gulp.src('angular/**/*.css')
            .pipe(gulp.dest('client'))
});

gulp.task('typebuild', function(){
    var tsResult = tsProject
        .src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());
  return tsResult.js
    .pipe(sourcemaps.write("client"))
    .pipe(gulp.dest("client"))
});

gulp.task('watch', function(){
    gulp.watch('angular/**/*.html',['html']);
    gulp.watch('angular/**/*.css',['css']);
    gulp.watch('angular/**/*.ts',['typebuild']);
    gulp.watch('angular/systemjs.config.js',['system']);
});

gulp.task("default",
['clean','typebuild','html','css','system','watch','nodemon','browser-sync']);
