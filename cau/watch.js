'use strict';

const gulp = require('gulp');
const config = require('./config');
const notifier = require('./notifier');
const path = require('path');

module.exports = function(done){
	
	// const dev = require('./dev');
	// gulp.task('dev', dev);	

	const watchPath =  config.get('source.path');
		
	gulp.src('.').pipe(notifier.message("Watching folder: " + path.join(__dirname, watchPath)))

	var watcher = gulp.watch( watchPath + '/**/*', { cwd: __dirname }, gulp.serial('dev'));
	watcher.on('error',function(err){
		console.log(err);
		done();
	});	
}