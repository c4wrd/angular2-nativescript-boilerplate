var gulp = require('gulp'),
    del = require('del'),
    shell = require('gulp-shell'),
    sass = require("gulp-sass"),
    runSeq = require('run-sequence');

gulp.task('frontend:clean', function(){
    return del('dist/frontend/**/*', {force:true});
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
      from: './src/frontend/index.html',
      to: './dist/frontend'
    },
    {
      from: './src/frontend/systemjs.config.js',
      to: './dist/frontend/assets/js'
    },
    {
      from: './src/frontend/assets',
      to: './dist/frontend'
    }
  ];

  return fssetup.map((setup) => {
    return gulp.src(setup.from).pipe(gulp.dest(setup.to));
  });
});

gulp.task('frontend:transpile:sass', function() {
     gulp.src('./src/frontend/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./dist/frontend/assets/css/'));
});

gulp.task('frontend:transpile:ts', shell.task(['tsc']));

gulp.task("sass:watch", function() {
   gulp.watch('./src/frontend/scss/**/*.scss',['frontend:transpile:sass']);
});

gulp.task('frontend:build', function(done){
    return runSeq('frontend:clean', 'frontend:copy', 'frontend:transpile:sass', 'frontend:transpile:ts', done);
});

gulp.task('default', ['frontend:build']);
