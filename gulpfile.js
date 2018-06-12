'use strict';

const gulp = require('gulp');
var requireDir = require('require-dir');
var cau = requireDir('./cau');

gulp.task('clean', cau.clean);
gulp.task('sass:dev', cau.sass.dev);
gulp.task('sass:dist', cau.sass.dist);
gulp.task('deploy:dev', cau.deploy.dev);
gulp.task('deploy:dist', cau.deploy.dist);
gulp.task('assets:dev', cau.assets.dev);
gulp.task('assets:dist', cau.assets.dist);
gulp.task('js:dev', cau.js.dev);
gulp.task('js:dist', cau.js.dist);
gulp.task('db:dump', cau.db.dump);
gulp.task('watch', cau.watch);
gulp.task('success', cau.success);

/**************************************************************/


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

gulp.task('watch', function(done){
	var watcher = gulp.watch( cau.config.get('source.path') + '/**/*' , gulp.series('dev'));
	watcher.on('error',function(err){
		console.log(error);
	});	
})

gulp.task('default', 
	gulp.series( 
		'dev'
	)
);