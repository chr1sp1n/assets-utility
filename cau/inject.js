'use strict';

const gulp = require('gulp');
const config = require('./config');
const inject = require('gulp-inject');
const path = require('path');
const pathExists = require('path-exists');

module.exports = {

	js: {
		dev: function( done ){

			var exceptions = config.getList('source.js.inject_to');
			var targets = [];
			if(exceptions){
				exceptions.forEach( function(e) {
					targets.push( path.join( __dirname, config.basePath, config.get('source.path')) + '/' + e );
				});
			}
			var target = gulp.src( targets );

			var filesRaw = config.getList('source.js.files');
			var files = [];
			filesRaw.forEach( function(f, i) {
				if(!pathExists.sync(f)){
					f = path.join( __dirname, config.basePath,  config.get('source.js.files['+ i +']') );
					if(!pathExists.sync(f)) f = false;
				}
				if(f) {
					files.push( path.join( __dirname, config.basePath,  config.get('source.js.files['+ i +']') ) );
				}
			});

			if(files.length > 0){
				var sources = gulp.src( files );
				return target.pipe( inject(sources) )
					.pipe( gulp.dest( path.join(__dirname, config.basePath, config.get('temp_path') + '/' )) );
			}
			done();
		},
		dist: function( done ){

		}
	},

	css: function( done ){
		done();
	}

}