'use strict';

const gulp = require('gulp');
const config = require('./config');
const inject = require('gulp-inject');
const path = require('path');
const pathExists = require('path-exists');

module.exports = {

	js: {
		dev: function( done ){

			var exceptions = config.get('source.js.inject_to');
			var targets = [];
			if(exceptions){
				exceptions.forEach( function(e) {
					targets.push( path.join( __dirname, config.basePath, config.get('source.path')) + '/' + e );
				});
			}
			var target = gulp.src( targets );

			var filesRaw = config.get('source.js.files');
			var files = [];
			filesRaw.forEach( function(f, i) {
				f = config.get('source.js.files['+ i +']');
				files.push( f );
			});

			if(files.length > 0){
				var sources = gulp.src(
					files,
					{ read: false }
				);
				return target.pipe(
					inject(
						sources,
						{
							transform: function(filepath){
								console.log(filepath);
								var file = path.join( config.get('source.js.dest') , path.basename(filepath) );
								return file.split('\\').join('/');
							}
						}
					)
				)
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