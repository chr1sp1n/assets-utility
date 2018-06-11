'use strict';

const gulp = require('gulp');
const config = require('./config');
const fileSync = require('gulp-file-sync');

module.exports = {
	dev: function(done) {
		return gulp.src([
			config.get('source.path')+'/**/*.*',
			'!'+config.get('source.scss.src')+'/**/*.*'
		])
		.pipe(gulp.dest(config.get('temp_path')+'/'))		
	},
	dist: function(done){
		return gulp.src([
			config.get('source.path')+'/**/*.*',
			'!'+config.get('source.scss.src')+'/**/*.*',
			'!'+config.get('source.js.src')+'/**/*.*'
		])
		.pipe(gulp.dest(config.get('temp_path')+'/'))		
	}
}


