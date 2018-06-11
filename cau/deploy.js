'use strict';

const gulp = require('gulp');
const config = require('./config-reader');
const fileSync = require('gulp-file-sync');

module.exports = {
	dev: function(done) {
		fileSync(config.get('temp_path'), config.get('deploy_path_dev'), { 
		 	recursive: true,
		});
		done();
	},
	dist: function(done) {
		fileSync(config.get('temp_path'), config.get('deploy_path_dist'), { 
			recursive: true 
		});
		done();
	}
}