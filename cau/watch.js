'use strict';

const gulp = require('gulp');
const config = require('./config');
const notifier = require('./notifier');
const path = require('path');

module.exports = function(done){
	const watchPath =  '../../' + config.get('source.path');

	gulp.src('.').pipe(notifier.message("Watching folder: " + path.join(__dirname, watchPath)))

	var watcher = gulp.watch( watchPath + '/**/*', { cwd: __dirname }, gulp.parallel('dev'));
	watcher.on('all',function(){
		console.clear();
	})
	watcher.on('error',function(err){
		console.log(err);
		done();
	});
}