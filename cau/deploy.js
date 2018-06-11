'use strict';

const gulp = require('gulp');
var config = require('./config-reader');
config = config.read();
const fileSync = require('gulp-file-sync');

module.exports = {
	dev: function(done) {
		fileSync(config.temp_path, config.deploy_path_dev, { recursive: true })
		done();
	},
	dist: function(done) {
		fileSync(config.temp_path, config.deploy_path_dist, { recursive: true })
		done();
	}
}