'use strict';

const gulp = require('gulp');
const config = require('./config');
const dev = require('./dev');

//gulp.task('dev', dev);

module.exports = function(done){
	var watcher = gulp.watch( config.get('source.path') + '/**/*' , gulp.parallel('dev'));
	watcher.on('error',function(err){
		console.log(err);
		donr();
	});	
}