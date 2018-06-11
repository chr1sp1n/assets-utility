'use strict';

const gulp = require('gulp');
const config = require('./config-reader');
const notifier = require('./notifier');


const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");

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