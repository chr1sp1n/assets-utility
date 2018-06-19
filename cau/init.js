'use strict';

const gulp = require('gulp');
const pathExists = require('path-exists');
const rename = require('gulp-rename');
const notifier = require('./notifier');
const config = require('./config');
const path = require('path');

module.exports = function(done){	
	if( pathExists.sync( path.join(__dirname,"../../assets-config.json") ) ){
		
	}else{
		gulp.src( path.join(__dirname,"/.default-config.json") )
			.pipe(rename('assets-config.json'))
			.pipe(gulp.dest( path.join(__dirname, "/../../") ).on("error", notifier.error(done)))
			.pipe(notifier.message(done,"Please edit file assets-config.json in '" + path.join(__dirname, "/../../") + "' and restart init script."));
	}
	done();
}