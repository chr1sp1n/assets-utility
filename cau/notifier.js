'use strict';

var config = require('./config');
var notify = require('gulp-notify');
var path = require('path');

var options = {
	success:{
		"title": config.get('notifier.success.title'),
		"message": config.get('notifier.success.message'),
		"onLast": config.get('notifier.success.onLast'),
		"icon": path.join(__dirname, config.get('notifier.success.icon'))
	},
	error:{
		"title": config.get('notifier.error.title'),		
		"message": config.get('notifier.error.message') + '<%= error.message %>',
		"onLast": config.get('notifier.error.onLast'),
		"icon": path.join(__dirname, config.get('notifier.error.icon'))		
	}		
};

module.exports = {
	success: function(){
		return notify( options.success );
	},
	error: function(done){
		return notify.onError( options.error , function(){			
			if(config.get('notifier.stop_on_error')) {
				process.exit(-1);
			}else{
				done();
			}
		});
	}
}