'use strict';

const gulp = require('gulp');
const config = require('./config');
const path = require('path');

module.exports = {
	drupal: function(done){
		return gulp.src( [ path.join(__dirname + '/smacss') + '/**/*', '!' + path.join(__dirname + '/smacss/styles.scss') ] )
			.pipe( gulp.dest( path.join(__dirname, '../../', config.get('source.scss.src')) ) );
	},
	wordpress: function(done){
		return gulp.src( [ path.join(__dirname + '/smacss') + '/**/*' ] )
			.pipe( gulp.dest( path.join(__dirname, '../../', config.get('source.scss.src')) ) );
	},
	other: function(done){
		return gulp.src( [ path.join(__dirname + '/smacss') + '/**/*' ] )
			.pipe( gulp.dest( path.join(__dirname, '../../', config.get('source.scss.src')) ) );
	}
}