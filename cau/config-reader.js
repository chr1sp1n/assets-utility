const defaultConfig = require("./.default-config.json");
var config = require("../config.json");

module.exports = {
	read: function(){
		
		Object.keys(config).forEach(function(c){
			if(defaultConfig[c]){
				Object.keys(config[c]).forEach(function(sc){
					if(defaultConfig[c][sc]) defaultConfig[c][sc] = config[c][sc];
				});
			}
		});
		config = defaultConfig;
		return config;

	}
}

