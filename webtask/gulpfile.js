const gulp = require('gulp');

const browserSync = require('browser-sync').create();

// browserSync and watchers
function watch() {
  browserSync.init({
    server: { baseDir: "./" },
    tunnel: false,
    host:'localhost',
    port: 8080,
    open: true,
    logLevel: "silent",
    notify: false,
    logLevel: "info"
  });

	gulp.watch('./*.html', browserSync.reload);
}

gulp.task('watch', watch);
