var gulp = require('gulp');
var del = require('del');
var ts = require('gulp-typescript');
var minifyhtml = require('gulp-minify-html');
var uglifycss = require('gulp-uglifycss');
var nodemon = require('gulp-nodemon');
var tsProject = ts.createProject('tsconfig.json');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', ['nodemon'], function(){
    browserSync.init(null, {
        proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        port: 7000,
    });
});

gulp.task('clean', function(){
    del(['client/*']);
});

gulp.task('nodemon', function(cb){
    var started = false;
    return nodemon({
        script: 'server.js'
    }).on('start', function(){
        if(!started){
            cb();
            started = true;
        }
    });
});

gulp.task('system', function(){
    return gulp.src('angular/systemjs.config.js')
            .pipe(gulp.dest('client/'));
});

gulp.task('html', function(){
    return gulp.src('angular/*.html')
            .pipe(minifyhtml())
            .pipe(gulp.dest('client'))
});

gulp.task('css', function(){
    return gulp.src('angular/*.css')
            .pipe(uglifycss())
            .pipe(gulp.dest('client'))
});

gulp.task('typebuild', function(){
  return tsProject.src()
  .pipe(tsProject())
  .js.pipe(gulp.dest("client"))
});

gulp.task('watch', function(){
  gulp.watch(
        ['angular/*.*','angular/**/*.*'],
        ['clean','system','html','css','typebuild']
    );
});

gulp.task("default", ['clean','typebuild','system','html','css','browser-sync']);
