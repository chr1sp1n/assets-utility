'use strict';

const gulp = require('gulp');
const requireDir = require('require-dir');
const cau = requireDir('./cau');

const pathExists = require('path-exists');
const path = require('path');

var basePath = '../../';
cau.config.basePath = basePath + '../';

var assetsConfigPath = path.join( __dirname, basePath, 'assets-config.json');
if(pathExists.sync( assetsConfigPath )){
	console.log('Using config file: ' + assetsConfigPath);
}

// shared tasks
gulp.task('clean', cau.clean);
gulp.task('assets', cau.assets);
gulp.task('success', cau.success);

// dev
gulp.task('sass:dev', cau.sass.dev);
gulp.task('js:dev', cau.js.dev);
gulp.task('js:inject:dev', cau.inject.js.dev);
gulp.task('deploy:dev', cau.deploy.dev);
gulp.task('public:dev',
	gulp.series(
		'clean',
		gulp.parallel(
			'sass:dev',
			'js:dev',
			'js:inject:dev',
			'assets:dev'
		),
		'deploy:dev',
		'success'
	)
);

// dist
//gulp.task('clean', cau.clean);
gulp.task('sass:dist', cau.sass.dist);
gulp.task('deploy:dist', cau.deploy.dist);
gulp.task('js:dist', cau.js.dist);
gulp.task('public:dist',
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


// public tasks
gulp.task('public:init', cau.init);
gulp.task('public:watch', cau.watch);
gulp.task('public:db:dump', cau.db);

//gulp.task('default', gulp.series('dev'));


module.exports = function(){

	var args = process.argv.slice(2);
	if(args.length == 1){
		if(gulp.task('public:' + args[0])){
			gulp.series('public:' + args[0])( err => {
				if(err) console.error(err);
			});
		}else{
			console.error('Error: Task ' + args[0] + ' not found.');
		}
	}else{
		console.log('Assets Utility v1.1.1');
	}

}
