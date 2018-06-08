'use strict';

var config = require('./config-reader');
config = config.read();
var notify = require('gulp-notify');
var path = require('path');

var options = {
	success:{
		"title": config.notifier.success.title,
		"message": config.notifier.success.message,
		"onLast": config.notifier.success.onLast,
		"icon": path.join(__dirname, config.notifier.success.icon)
	},
	error:{
		"title": config.notifier.error.title,		
		"message": config.notifier.error.message + '<%= error.message %>',
		"onLast": config.notifier.error.onLast,
		"icon": path.join(__dirname, config.notifier.error.icon)		
	}		
};

module.exports = {
	success: function(){
		return notify( options.success );
	},
	error: function(){
		return notify.onError( options.error , function(){
			process.exit(-1);
		});
	}
}