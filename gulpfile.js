var gulp = require('gulp'),
    del = require('del'),
    shell = require('gulp-shell'),
    sass = require("gulp-sass"),
    runSeq = require('run-sequence');

gulp.task('dist:clean', function(){
    return del('dist/**/*', {force:true});
});

gulp.task('frontend:copy', () => {
  var fssetup = [
    {
      from: [
          "node_modules/es6-shim/es6-shim.min.js",
          "node_modules/reflect-metadata/Reflect.js",
          "node_modules/systemjs/dist/system.src.js",
          "node_modules/zone.js/dist/zone.js"
      ],
      to: "./dist/frontend/assets/js/vendor"
    },
    {
      from: "node_modules/@angular/**/*",
      to: "./dist/frontend/assets/js/vendor/@angular"
    },
    {
      from: "node_modules/rxjs/**/*",
      to: "./dist/frontend/assets/js/vendor/rxjs"
    },
    {
      from: ['./src/frontend/**/*', '!./src/frontend/assets/scss/**/*'],
      to: './dist/frontend'
    }
  ];

  return fssetup.map((setup) => {
    return gulp.src(setup.from).pipe(gulp.dest(setup.to));
  });
});

gulp.task('frontend:transpile:sass', function() {
     gulp.src('./src/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist'));
});

gulp.task("sass:watch", function() {
   gulp.watch('./src/**/*.scss',['frontend:transpile:sass']);
});

gulp.task('frontend:transpile:ts', shell.task(['tsc']));

gulp.task('frontend:build', function(done){
    return runSeq('dist:clean', 'frontend:copy', 'frontend:transpile:sass', 'frontend:transpile:ts', done);
});

gulp.task('default', ['frontend:build']);
