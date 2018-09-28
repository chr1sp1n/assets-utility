'use strict';

const gulp = require('gulp');
const config = require('./config');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');
const obfuscator = require('gulp-javascript-obfuscator');
const path = require('path');
const pathExists = require('path-exists');

module.exports = {

	dev: function(done) {
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
			return gulp.src( files )
				.pipe( gulp.dest( path.join(__dirname, config.basePath, config.get('source.js.dest')) ));
		}
		done();
	},

	dist: function(done){
		return gulp.src( path.join(__dirname, config.basePath, config.get('source.js.src')) + '/**/*.js' )
			.pipe(concat(config.get('source.js.cocat_to')))
			.pipe(uglify())
			.pipe(obfuscator())
			.pipe(gulp.dest( path.join(__dirname, config.basePath, config.get('source.js.dest')) ));
	}

}