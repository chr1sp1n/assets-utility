'use strict';

const gulp = require('gulp');
var requireDir = require('require-dir');
var cau = requireDir('./cau');

gulp.task('sass:dev', cau.sass.dev);
gulp.task('sass:dist', cau.sass.dist);
gulp.task('deploy:dev', cau.deploy.dev);
gulp.task('deploy:dist', cau.deploy.dist);
gulp.task('assets:dev', cau.assets.dev);
gulp.task('assets:dist', cau.assets.dist);


/**************************************************************/


gulp.task('dev', 
	gulp.series(
		'sass:dev' ,
		'assets:dev' ,
		'deploy:dev',
		function(done){ done(); }
	)
);

gulp.task('dist', 
	gulp.series(
		'sass:dist' ,
		'assets:dist',
		'deploy:dist',
		function(done){ done(); }
	)
);

gulp.task('default', 
	gulp.series( 
		'dev',
		function(done) {
			gulp.src(".").pipe( cau.notifier.success() );
			done();
		}
	)
);