'use strict';

const gulp = require('gulp');
const notifier = require('./notifier');

module.exports = function(done){	
	return gulp.src(".").pipe( notifier.success() );	
}
