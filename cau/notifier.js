'use strict';

const config = require('./config');
const notify = require('gulp-notify');
const path = require('path');

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
	},
	message:{
		"title": config.get('notifier.message.title'),
		"message": config.get('notifier.message.message'),
		"onLast": config.get('notifier.message.onLast'),
		"icon": path.join(__dirname, config.get('notifier.message.icon'))
	}
};

module.exports = {
	success: function(){
		return notify( options.success );
	},
	error: function(done,err){
		return notify.onError( options.error , function(){			
			if(config.get('stop_on_error')) {
				process.exit(-1);
			}else{
				done();
			}
			console.error(err);
		});
	},
	message: function(done,msg){
		var opts = JSON.parse(JSON.stringify(options.message));
		opts.message = msg;
		return notify( opts );
	}
}