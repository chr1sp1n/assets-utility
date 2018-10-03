'use strict';

const gulp = require('gulp');
const config = require('./config');
const path = require('path');

// module.exports = {

// 	dev: function(done) {

// 		var src = [];
// 		src.push( path.join( __dirname, config.basePath, config.get('source.path')) + '/**/*' );
// 		src.push( path.join( __dirname, config.basePath, config.get('source.path')) + '/**/.*' );

// 		src.push( '!'+ path.join( __dirname, config.basePath, config.get('source.scss.src')) + '/**' );
// 		src.push( '!'+ path.join( __dirname, config.basePath, config.get('source.js.src')) + '/**' );

// 		var exceptions = config.get('source.js.inject_to');
// 		if(exceptions){
// 			exceptions.forEach( function(e) {
// 				src.push( '!' + path.join( __dirname, config.basePath, config.get('source.path')) + '/' + e );
// 			});
// 		}

// 		return gulp.src( src )
// 			.pipe( gulp.dest( path.join(__dirname, config.basePath, config.get('temp_path') + '/' )) );

// 	},

// 	dist: function(done){

// 		var src = [];
// 		src.push( path.join( __dirname, config.basePath, config.get('source.path')) + '/**/*' );
// 		src.push( path.join( __dirname, config.basePath, config.get('source.path')) + '/**/.*' );

// 		src.push( '!'+ path.join( __dirname, config.basePath, config.get('source.scss.src')) + '/**' );
// 		src.push( '!'+ path.join( __dirname, config.basePath, config.get('source.js.src')) + '/**' );

// 		var exceptions = config.get('source.js.inject_to');
// 		if(exceptions){
// 			exceptions.forEach( function(e) {
// 				src.push( '!' + path.join( __dirname, config.basePath, config.get('source.path')) + '/' + e );
// 			});
// 		}

// 		return gulp.src( src )
// 			.pipe( gulp.dest( path.join(__dirname, config.basePath, config.get('temp_path') + '/')) );
// 	}

// }


module.exports = function(done){

	var src = [];
	src.push( path.join( __dirname, config.basePath, config.get('source.path')) + '/**/*' );
	src.push( path.join( __dirname, config.basePath, config.get('source.path')) + '/**/.*' );

	src.push( '!'+ path.join( __dirname, config.basePath, config.get('source.scss.src')) + '/**' );
	src.push( '!'+ path.join( __dirname, config.basePath, config.get('source.js.src')) + '/**' );

	var exceptions = config.get('source.js.inject_to');
	if(exceptions){
		exceptions.forEach( function(e) {
			src.push( '!' + path.join( __dirname, config.basePath, config.get('source.path')) + '/' + e );
		});
	}

	return gulp.src( src )
		.pipe( gulp.dest( path.join(__dirname, config.basePath, config.get('temp_path') + '/' )) );

}