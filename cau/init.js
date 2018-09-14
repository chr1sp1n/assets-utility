'use strict';

const gulp = require('gulp');
const pathExists = require('path-exists');
const rename = require('gulp-rename');
const notifier = require('./notifier');
const config = require('./config');
const smacss = require('./smacss');
const path = require('path');
const mkdirp = require('mkdirp');

const makeDir = function(done, dir){
	if(! pathExists.sync(dir)){
		mkdirp( dir, function( err ){
			if(err) gulp.src('.').pipe( notifier.error(done, 'Fail to create folder ' + dir ));
		});
	}
}

module.exports = function(done){
	if( pathExists.sync( path.join(__dirname, "../../assets-config.json") ) ){
		makeDir(done, path.join(__dirname, '../../', config.get('deploy_path_dev')));
		makeDir(done, path.join(__dirname, '../../', config.get('source.path')));
		makeDir(done, path.join(__dirname, '../../', config.get('source.scss.src')));
		makeDir(done, path.join(__dirname, '../../', config.get('source.scss.dest')));
		makeDir(done, path.join(__dirname, '../../', config.get('source.js.src')));
		makeDir(done, path.join(__dirname, '../../', config.get('source.js.dest')));

		if(config.get('source.scss.smacss')){
			switch(config.get('site.type')){
				case 'drupal':
					smacss.drupal();
					break;
				case 'wordpress':
					smacss.wordpress();
					break;
				default:
					smacss.other();
			}
		}

		return gulp.src('.').pipe( notifier.success() );
	}
	return gulp.src( path.join(__dirname, '/.default-config.json') )
		.pipe(rename('assets-config.json'))
		.pipe(gulp.dest( path.join(__dirname, '/../../') ).on("error", notifier.error(done)))
		.pipe(notifier.message("Please edit file assets-config.json in '" + path.join(__dirname, '/../../') + "' and restart init script."));
}