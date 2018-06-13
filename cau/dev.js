'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir');
const cau = requireDir('./');

gulp.task('clean', cau.clean);
gulp.task('sass:dev', cau.sass.dev);
gulp.task('deploy:dev', cau.deploy.dev);
gulp.task('assets:dev', cau.assets.dev);
gulp.task('js:dev', cau.js.dev);
gulp.task('success', cau.success);

module.exports = function(){
	return gulp.series(
		'clean',
		gulp.parallel(
			'sass:dev',
			'js:dev',
			'assets:dev'
		),
		'deploy:dev',
		'success'
	)
}

