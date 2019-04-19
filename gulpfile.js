var gulp        =   require('gulp');
var gutil       =   require('gulp-util');
var concat      =   require('gulp-concat');
var sass        =   require('gulp-sass');
var cleanCSS    =   require('gulp-clean-css');
var rename      =   require('gulp-rename');

gulp.task('build', function () {
    return gulp.src('./src/styles/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./src/'))
        .pipe(cleanCSS())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(gulp.dest('./src/'));
});

gulp.task('build:watch', function() {
    gulp.watch('./src/styles/sass/**/*.scss', gulp.series('build'));
});
