'use strict';
const gulp = require('gulp');
const config = require('./config');
const notifier = require('./notifier');
const mysqldump = require("mysqldump");
const dateFormat = require('dateformat');
const pathExists = require('path-exists');
const mkdirp = require('mkdirp');
const replace = require('gulp-replace');

const dump = function(config){
	var now = new Date();
	if(!pathExists.sync(config.dest)) mkdirp( config.dest );
	var filename = 'db-dump_' + dateFormat(now,"yyyy-mm-dd_hh-MM-ss") + '.sql';	
	config = JSON.parse(JSON.stringify(config));
	config.dest = config.dest + '/' + filename;
	return new Promise(
		function(resolve, reject){
			mysqldump(
				config, 
				function(err) {
					if(err !== null) {
						reject(err);
					}else{
						resolve(filename);
					}
				}
			);
		}
	);
}

module.exports = {
	dump: function(done) {
		var db_conf = config.get('db');
		if(typeof(db_conf) == 'undefined') done();
		return dump(db_conf)
			.then(function(filename){
				return gulp.src(db_conf.dest + '/' + filename)
					.pipe( replace(db_conf.site_hosts.dev, db_conf.site_hosts.dist) )
					.pipe( gulp.dest( db_conf.dest + "/dist" ) );
			})
			.catch(function(err){
				notifier.error(done, err);
			});
	}
}