'use strict';

const gulp = require('gulp');
const config = require('./config');
const path = require('path');

module.exports = {
	dev: function(done) {
		return gulp.src([
			path.join( __dirname, '../../', config.get('source.path')) + '/**/*',
			'!'+ path.join( __dirname, '../../', config.get('source.scss.src')) + '/**',
			'!'+ path.join( __dirname, '../../', config.get('source.js.src')) + '/**'
		])
		.pipe( gulp.dest( path.join(__dirname, '../../', config.get('temp_path')+'/')) );
	},
	dist: function(done){
		return gulp.src([
			path.join( __dirname, '../../', config.get('source.path')) + '/**/*',
			'!'+ path.join( __dirname, '../../', config.get('source.scss.src')) + '/**',
			'!'+ path.join( __dirname, '../../', config.get('source.js.src')) + '/**'
		])
		.pipe( gulp.dest( path.join(__dirname, '../../', config.get('temp_path') + '/')) );
	}
}


