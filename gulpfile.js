'use strict';

const gulp = require('gulp');
//const instructions = require('./cau/instructions.txt');
var requireDir = require('require-dir');
var cau = requireDir('./cau');

gulp.task('dev', cau.dev);
gulp.task('dist', cau.dist);
gulp.task('watch', cau.watch);
gulp.task('init', cau.init);

gulp.task('default', function(done){
	//console.log(instructions);
	done();
});