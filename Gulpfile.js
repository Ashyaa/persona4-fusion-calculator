// Include gulp
var gulp = require('gulp');

// Include plugins
var gutil = require('gulp-util');
var jshint = require('gulp-jshint');
var browserify = require('gulp-browserify');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var clean = require('gulp-clean');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

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
    res.sendfile('index.html', { root: 'build' });
});

// JSHint task
gulp.task('lint', function() {
    gulp.src('./src/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));   
}); 

// SASS task
gulp.task('sass', function(){
    gulp.src('src/sass/**/*.scss')
        .pipe(sass({onError: function(e) {console.log(e); } }))
        .pipe(gulp.dest('build/css')); 
    
    gulp.src('src/sass/*.scss')
        .pipe(sass({onError: function(e) {console.log(e); } }))
        .pipe(gulp.dest('build/css'))
        .pipe(refresh(lrserver)); 
});

//Browserify task
gulp.task('browserify', function() {
    // Single entry point to browserify 
    gulp.src('src/js/app.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : true
        }))
        .pipe(concat('bundle.js'))
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
  gulp.run('browserify');
  gulp.run('watch');
});

gulp.task('default', ['lint','assets','sass','browserify','watch']);