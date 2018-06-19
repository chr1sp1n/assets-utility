'use strict';

const gulp = require('gulp');
const config = require('./config');
const clean = require('gulp-clean');
const pathExists = require('path-exists');
const mkdirp = require('mkdirp');
const notifier = require('./notifier');
const path = require('path');

module.exports = function(done) {
	var tmp = path.join( __dirname, config.get('temp_path'));
	if( pathExists.sync(tmp) ){
		return gulp.src( 
			tmp + '/**' , {read: false}
		)
		.pipe( clean() );		
	}else{
		mkdirp( tmp, function(err){
			if(err) gulp.join('.').pipe(notifier.error(done, err));
		});
		done();
	}
}


