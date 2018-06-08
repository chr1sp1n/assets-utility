'use strict';

const gulp = require('gulp');
var config = require('./config-reader');
config = config.read();
const notifier = require('./notifier');

var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");

module.exports = {
	dev: function(done) {		

		gulp.src(config.source.scss+"**/*.scss")
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
				gulp.dest(config.temp_path + '/css/') 
					.on( "error", notifier.error() )
			);
		done();
	},
	dist: function (done) {		
		gulp.src(config.source.scss+"**/*.scss")
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
				gulp.dest(config.temp_path + '/css/')
					.on( "error", notifier.error() )
			);	
		done();
	}
}