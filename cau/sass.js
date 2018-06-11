'use strict';

const gulp = require('gulp');
var config = require('./config-reader');
const notifier = require('./notifier');

var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");


var concatcss = require('gulp-concat-css');

module.exports = {
	dev: function(done) {		
		gulp.src( config.get('source.scss.src') + "/**/*.scss" )
			.pipe( sourcemaps.init() )
			.pipe( 
				sass()
					.on( "error", notifier.error() ) 
			)
			// .pipe( 
			// 	postcss([
			// 		autoprefixer(),
			// 		cssnano()
			// 	])
			// )
			.pipe(sourcemaps.write())
			.pipe( 
				gulp.dest( config.get('source.scss.dest') ) 
					.on( "error", notifier.error() )
			);
		done();
	},
	dist: function (done) {		
		gulp.src( config.get('source.scss.src') + "/**/*.scss" )
			//.pipe( sourcemaps.init() )
			.pipe( 
				sass()
					.on( "error", notifier.error() ) 
			)
			.pipe( 
				postcss([
					autoprefixer(),
					cssnano()
				])
			)
			//.pipe(sourcemaps.write())
			.pipe(
				gulp.dest( config.get('source.scss.dest') )
					.on( "error", notifier.error() )
			);	
		done();
	}
}