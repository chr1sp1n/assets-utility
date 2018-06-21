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

module.exports = function(done) {
	var db = config.get('db');
	var site = config.get('site');
	if(typeof(db) == 'undefined' || typeof(site) == 'undefined') done();
	return dump(db)
		.then(function(filename){
			if(site.type == 'wordpress'){
				return gulp.src(db.dest + '/' + filename)
					.pipe( replace(site.hosts.dev, site.hosts.dist) )
					.pipe( gulp.dest( db.dest + "/dist" ) )
					.pipe( notifier.success() );
			}
		})
		.catch(function(err){
			console.log(err);			
		});
}
