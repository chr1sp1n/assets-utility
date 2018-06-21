'use strict';

module.exports = function(){

	const gulp = require('gulp');

	const clean = require('./clean');
	const sass = require('./sass');
	const js = require('./js');
	const assets = require('./assets');
	const deploy = require('./deploy');	
	const success = require('./success');
	
	gulp.task('clean', clean);
	gulp.task('sass:dev', sass.dev);
	gulp.task('deploy:dev', deploy.dev);
	gulp.task('assets:dev', assets.dev);
	gulp.task('js:dev', js.dev);
	gulp.task('success', success);

	return gulp.series(
		'clean',
		gulp.parallel(
			'sass:dev',
			'js:dev',
			'assets:dev'
		),
		'deploy:dev',
		'success'
	);
}
