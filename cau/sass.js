'use strict';

const gulp = require('gulp');
const config = require('./config');
const notifier = require('./notifier');


const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

module.exports = {
	dev: function(done) {
		return gulp.src( config.get('source.scss.src') + "/**/*.scss" )
			.pipe( sourcemaps.init() )
			.pipe( 
				sass()
					.on( "error", notifier.error(done) ) 
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
					.on( "error", notifier.error(done) )
			);
	},
	dist: function (done) {		
		return gulp.src( config.get('source.scss.src') + "/**/*.scss" )
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
	}
}