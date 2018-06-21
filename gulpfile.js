'use strict';

const gulp = require('gulp');
const dev = require('./cau/dev');
const dist = require('./cau/dist');
const watch = require('./cau/watch');
const init = require('./cau/init');
const db = require('./cau/db');

gulp.task('init', init);
gulp.task('dev', dev);
gulp.task('dist', dist);
gulp.task('watch', watch);
gulp.task('db', db);

gulp.task('default', function(done){
	//console.log(instructions);
	done();
});