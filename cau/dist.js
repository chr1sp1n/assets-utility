'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir');
const cau = requireDir('./');

gulp.task('clean', cau.clean);
gulp.task('sass:dist', cau.sass.dist);
gulp.task('deploy:dist', cau.deploy.dist);
gulp.task('assets:dist', cau.assets.dist);
gulp.task('js:dist', cau.js.dist);
gulp.task('success', cau.success);

module.exports = function(){
	return gulp.series(
		'clean',
		gulp.parallel(
			'sass:dist',
			'js:dist',
			'assets:dist'
		),
		'deploy:dist',
		'success'
	)
}