// 'use strict';

// const gulp = require('gulp');
// const requireDir = require('require-dir');
// const cau = requireDir('./');

// gulp.task('dev', cau.dev);

// module.exports = function(done){
// 	//console.log(__dirname + '/' + cau.config.get('source.path'));
// 	var watcher = gulp.watch( './source' + '/**/*' , gulp.series(
// 		'dev'//,'server:reload'
// 	));
// 	watcher.on('error',function(err){
// 		console.log(error);
// 		done();
// 	});	
// }