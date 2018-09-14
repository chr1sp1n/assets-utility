'use strict';

const gulp = require('gulp');
const config = require('./config');
const notifier = require('./notifier');

const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const path = require('path');

module.exports = {
	dev: function(done) {
		var find = (config.get('site.type')=='drupal')? "/**/*.scss" : "/*.scss";
		return gulp.src( path.join(__dirname, '../../', config.get('source.scss.src')) + find )
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
				gulp.dest( path.join(__dirname, '../../', config.get('source.scss.dest')) )
					.on( "error", notifier.error(done) )
			);
	},
	dist: function (done) {
		var find = (config.get('site.type')=='drupal')? "/**/*.scss" : "/*.scss";
		return gulp.src( path.join(__dirname, '../../', config.get('source.scss.src')) + find )
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
				gulp.dest( path.join(__dirname, '../../', config.get('source.scss.dest')) )
					.on( "error", notifier.error() )
			);
	}
}