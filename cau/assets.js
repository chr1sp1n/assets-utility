'use strict';

const gulp = require('gulp');
const config = require('./config');
const path = require('path');
const pathExists = require('path-exists');

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
	//src.push( '!'+ path.join( __dirname, config.basePath, config.get('source.path')) + '/**' );

	var filesRaw = config.get('source.js.files');
	filesRaw.forEach( function(f, i) {
		if(!pathExists.sync(f)){
			f = path.join( __dirname, config.basePath, config.get('source.js.files['+ i +']') );
			if(!pathExists.sync(f)) f = false;
		}
		if(f) {
			src.push( '!' + path.join( __dirname, config.basePath,  config.get('source.js.files['+ i +']') ) );
		}
	});

	var exceptions = config.get('source.js.inject_to');
	if(exceptions){
		exceptions.forEach( function(e, i) {
			src.push( '!' + path.join( __dirname, config.basePath, config.get('source.js.inject_to['+ i +']') ) );
		});
	}

	console.log(path.join(__dirname, config.basePath, config.get('temp_path') + '/' ));
	return gulp.src( src )
		.pipe( gulp.dest( path.join(__dirname, config.basePath, config.get('temp_path') + '/' )) );

}