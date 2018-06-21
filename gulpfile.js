'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir');
const cau = requireDir('./cau');

// dev
gulp.task('clean', cau.clean);
gulp.task('sass:dev', cau.sass.dev);
gulp.task('js:dev', cau.js.dev);
gulp.task('assets:dev', cau.assets.dev);
gulp.task('deploy:dev', cau.deploy.dev);
gulp.task('success', cau.success);
gulp.task('dev',
	gulp.series(
		'clean',
		gulp.parallel(
			'sass:dev',
			'js:dev',
			'assets:dev'
		),
		'deploy:dev',
		'success'
	)
);

// dist
gulp.task('clean', cau.clean);
gulp.task('sass:dist', cau.sass.dist);
gulp.task('deploy:dist', cau.deploy.dist);
gulp.task('assets:dist', cau.assets.dist);
gulp.task('js:dist', cau.js.dist);
gulp.task('success', cau.success);
gulp.task('dist',
	gulp.series(
		'clean',
		gulp.parallel(
			'sass:dist',
			'js:dist',
			'assets:dist'
		),
		'deploy:dist',
		'success'
	)
);

gulp.task('init', cau.init);
gulp.task('watch', cau.watch);
gulp.task('db:dump', cau.db);
gulp.task('default', gulp.series('dev'));