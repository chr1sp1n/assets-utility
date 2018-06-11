'use strict';

const gulp = require('gulp');
const config = require('./config');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const obfuscator = require('gulp-javascript-obfuscator');

module.exports = {
	dev: function(done) {
		return gulp.src( config.get('source.js.src')+'/**/*.js' )
			.pipe( gulp.dest( config.get('source.js.dest') ))		
	},
	dist: function(done){
		return gulp.src( config.get('source.js.src')+'/**/*.js' )
			.pipe(concat(config.get('source.js.cocat_to')))
			.pipe(uglify())
			.pipe(obfuscator())
			.pipe(gulp.dest( config.get('source.js.dest')));
	}
}