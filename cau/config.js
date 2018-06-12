'use strict';

const pathExists = require('path-exists');

module.exports = {
	read: function(){
		const defaultConfig = require("./.default-config.json");
		if(pathExists.sync("../config.json")){
			var config = require("../config.json");
			Object.keys(config).forEach(function(c){
				if(defaultConfig[c]){
					Object.keys(config[c]).forEach(function(sc){
						if(typeof(defaultConfig[c][sc]) == 'undefined') {
							defaultConfig[c] = {};
						}
						defaultConfig[c][sc] = config[c][sc];
					});
				}else{
					defaultConfig[c] = config[c];
				}
			});
		}
		config = defaultConfig;
		return config;
	},
	get: function(item){
		if(typeof(item) == 'undefined') return undefined;
		var config = this.read();
		var data = eval('config.'+item);		
		if(typeof(data) == 'string'){
			var openGraph = data.indexOf("{{");
			while(openGraph>-1){
				var closedGraph = data.indexOf("}}");
				var variable = data.substring(openGraph+2, closedGraph);
				var content = eval('config.'+variable);
				data = data.replace('{{' + variable + '}}', content);
				openGraph = data.indexOf("{{", closedGraph);
			}	
		}
		return data;
	}
}

