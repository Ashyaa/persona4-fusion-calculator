// Include gulp
var gulp = require('gulp');

// Include plugins
// var jshint = require('gulp-jshint');
// var browserify = require('gulp-browserify');
// var sass = require('gulp-sass');
// var concat = require('gulp-concat');


// Include plugins
var plugins = require("gulp-load-plugins")({
	pattern: ['gulp-*', 'gulp.*', 'main-bower-files'],
	replaceString: /\bgulp[\-.]/
});

var embedlr = require('gulp-embedlr'),
    refresh = require('gulp-livereload'),
    lrserver = require('tiny-lr')(),
    express = require('express'),
    livereload = require('connect-livereload'),
    livereloadport = 35729,
    serverport = 5000;

// Set up an express server (but not starting it yet)
var server = express();
// Add live reload
server.use(livereload({port: livereloadport}));
// Use our 'dist' folder as rootfolder
server.use(express.static('./build'));
// Because I like HTML5 pushstate... this redirects everything back to our index.html
server.all('/*', function(req, res) {
    res.sendFile('index.html', { root: 'build' });
});

// JSHint task
gulp.task('lint', function() {
    gulp.src('./src/js/*.js')
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'));
});

// SASS task
gulp.task('sass', function(){
    gulp.src('src/sass/**/*.scss')
        .pipe(plugins.sass({onError: function(e) {console.log(e); } }))
        .pipe(gulp.dest('build/css'));

    gulp.src('src/sass/*.scss')
        .pipe(plugins.sass({onError: function(e) {console.log(e); } }))
        .pipe(gulp.dest('build/css'))
        .pipe(refresh(lrserver));
});

//Browserify task
gulp.task('browserify', function() {
    // Single entry point to browserify
    gulp.src('src/js/app.js')
        .pipe(plugins.browserify({
          insertGlobals : true,
          debug : true
        }))
        .pipe(plugins.concat('bundle.js'))
        .pipe(gulp.dest('build/js'));
});

// Views task
gulp.task('views', function() {
   // Get our index.html
   gulp.src('src/index.html')
   // And put it in the build folder
   .pipe(gulp.dest('build/'));

   gulp.src('./src/views/**/*')
  .pipe(gulp.dest('build/views/'))
  .pipe(refresh(lrserver)); // Tell the lrserver to refresh
});

// Vendors task
gulp.task('vendors', function() {

	gulp.src(plugins.mainBowerFiles())
		.pipe(plugins.filter('*.js'))
		.pipe(plugins.concat('vendors.js'))
		.pipe(plugins.uglify())
		.pipe(gulp.dest('build/js'));

});

// Assets task
gulp.task('assets', function() {

   gulp.src('./src/assets/fonts/*.eot')
  .pipe(gulp.dest('build/assets/fonts/'));

  gulp.src('./src/assets/fonts/*.svg')
  .pipe(gulp.dest('build/assets/fonts/'));

  gulp.src('./src/assets/fonts/*.ttf')
  .pipe(gulp.dest('build/assets/fonts/'));

  gulp.src('./src/assets/fonts/*.woff')
  .pipe(gulp.dest('build/assets/fonts/'));

  gulp.src('./src/assets/fonts/*.woff2')
  .pipe(gulp.dest('build/assets/fonts/'));

   gulp.src('./src/assets/images/*.png')
  .pipe(gulp.dest('build/assets/images/'))

   gulp.src('./src/assets/images/*.jpg')
  .pipe(gulp.dest('build/assets/images/'))
  .pipe(refresh(lrserver)); // Tell the lrserver to refresh
});

// Watch files for changes
gulp.task('watch', ['lint'], function() {
   gulp.watch(['src/js/*.js', 'src/js/**/*.js'], [
       'lint',
       'browserify'
   ]);

   gulp.watch(['src/sass/*.scss', 'src/sass/**/*.scss'], [
       'sass'
   ]);

   gulp.watch(['src/index.html', 'src/views/**/*.html'], [
       'views'
   ]);

   gulp.watch(['src/assets/images/*.jpg','./src/assets/fonts/*.eot','./src/assets/fonts/*.svg',
   './src/assets/fonts/*.ttf','./src/assets/fonts/*.woff','./src/assets/fonts/*.woff2'], [
       'assets'
   ]);
});

// Dev task
gulp.task('dev', function() {
  // Start webserver
  server.listen(serverport);
  // Start live reload
  lrserver.listen(livereloadport);
  // Run the watch task, to keep taps on changes
  gulp.run('assets');
  gulp.run('vendors');
  gulp.run('browserify');
  gulp.run('views');
  gulp.run('sass');
  gulp.run('watch');
});

gulp.task('default', ['lint','assets','sass','browserify','watch']);