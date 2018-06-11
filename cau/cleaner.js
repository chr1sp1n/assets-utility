'use strict';

const gulp = require('gulp');
const config = require('./config-reader');
const clean = require('gulp-clean');

module.exports = function(done) {
	gulp.src( config.get('temp_path') )
		.pipe( clean() );
	done();
}


