'use strict';

const gulp = require('gulp');
const config = require('./config');
const clean = require('gulp-clean');
const pathExists = require('path-exists');
const mkdirp = require('mkdirp');
const notifier = require('./notifier');

module.exports = function(done) {
	if(pathExists.sync(config.get('temp_path'))){
		return gulp.src( config.get('temp_path') + '/**/*.*' , {read: false})
			.pipe( clean() );
	}else{
		mkdirp( config.get('temp_path'), function(err){
			if(err) notifier.error(done, err);			
		});
	}	
}


