'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir');
const cau = requireDir('./cau');

gulp.task('dev', cau.dev);
gulp.task('dist', cau.dist);
//gulp.task('watch', cau.watch);
gulp.task('serve', cau.server);

gulp.task('default', 
	gulp.series( 
		'dev'
	)
);