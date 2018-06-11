'use strict';

const gulp = require('gulp');
const config = require('./config-reader');
const fileSync = require('gulp-file-sync');

module.exports = {
	dev: function(done) {
		gulp.src([
			config.get('source.path')+'/**/*.*',
			'!'+config.get('source.scss.src')+'/**/*.*'
		])
		.pipe(gulp.dest(config.get('temp_path')+'/'))
		done();
	},
	dist: function(done){
		gulp.src([
			config.get('source.path')+'/**/*.*',
			'!'+config.get('source.scss.src')+'/**/*.*',
			'!'+config.get('source.js.src')+'/**/*.*'
		])
		.pipe(gulp.dest(config.get('temp_path')+'/'))
		done();
	}
}


