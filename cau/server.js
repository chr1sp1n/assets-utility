'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir');
const cau = requireDir('./');
const server  = require('browser-sync').create();


gulp.task('dev', cau.dev);


gulp.task('server:serve', function(done){
	server.init({
		server: {
			baseDir: __dirname + '/' + cau.config.get('source.path')
		}
	},done);
});
gulp.task('server:reload', function(done){
	console.log("resloa");
	server.reload();
	done();
})


gulp.task('watch', function(done){
	var watcher = gulp.watch( './source' + '/**/*' , gulp.series(
		'dev',
		'server:reload'
	));
	watcher.on('error',function(err){
		console.log(error);
		done();
	});
});

module.exports = gulp.series(
	'server:serve',
	'watch'
)