'use strict';

const gulp = require('gulp');
const config = require('./config');
const pathExists = require('path-exists');
const mkdirp = require('mkdirp');
const notifier = require('./notifier');
const path = require('path');
var del = require('del');

module.exports = function(done) {
	var tmp = path.join( __dirname, '../../', config.get('temp_path'));
	if( pathExists.sync(tmp) ){
		return del( tmp + '/**', { force: true } );
	}else{
		mkdirp( tmp, function(err){
			if(err) gulp.join('.').pipe(notifier.error(done, err));
		});
		done();
	}
}