var gulp = require('gulp'),
    del = require('del'),
    shell = require('gulp-shell'),
    sass = require("gulp-sass"),
    runSeq = require('run-sequence');

gulp.task('app:clean', () =>{
    return del('app/**/*', {force:true});
});

gulp.task('app:copy', () => {
  return gulp.src(['./src/**/*', '!./src/**/*.scss', '!./src/**/*.ts'])
    .pipe(gulp.dest('./app'));
});

gulp.task('app:transpile:sass', () => {
     gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./app'));
});

gulp.task("sass:watch", () => {
   gulp.watch('./src/**/*.scss',['app:transpile:sass']);
});

gulp.task('app:transpile:ts', shell.task(['tsc']));

gulp.task('app:build', (done) => {
    return runSeq('app:clean', 'app:copy', 'app:transpile:sass', 'app:transpile:ts', done);
});

gulp.task('app:watch', () => {
  return gulp.watch([
    './src/**/*',
    '!./src/**/*.ts',
    '!./src/**/*.scss'], ['app:copy']);
});

gulp.task('default', ['app:build']);
