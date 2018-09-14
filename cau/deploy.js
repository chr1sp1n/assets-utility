'use strict';

const config = require('./config');
const fileSync = require('gulp-file-sync');
const path = require('path');

module.exports = {
	dev: function(done) {
		fileSync( path.join(__dirname, '../../', config.get('temp_path')) , path.join(__dirname, '../../', config.get('deploy_path_dev')) , {
		 	recursive: true,
		});
		done();
	},
	dist: function(done) {
		fileSync( path.join(__dirname, '../../', config.get('temp_path')) , path.join(__dirname, '../../', config.get('deploy_path_dist')) , {
			recursive: true
		});
		done();
	}
}