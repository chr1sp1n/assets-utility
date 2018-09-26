'use strict';

const pathExists = require('path-exists');
const path = require('path');

module.exports = {
	read: function(){
		var defaultConfig = require("./.default-config.json");
		if(pathExists.sync( __dirname + "/../../assets-config.json" )){
			var config = require("../../assets-config.json");
			Object.keys(config).forEach(function(c){
				if(defaultConfig[c]){
					if(typeof(config[c]) == 'object'){
						Object.keys(config[c]).forEach(function(sc){
							if(typeof(config[c][sc]) == 'object'){
								Object.keys(config[c][sc]).forEach(function(ssc){
									if(typeof(defaultConfig[c][sc][ssc]) == 'undefined') defaultConfig[c][sc] = {};
									defaultConfig[c][sc][ssc] = config[c][sc][ssc];
								});
							}else{
								if(typeof(defaultConfig[c][sc]) == 'undefined') defaultConfig[c] = {};
								defaultConfig[c][sc] = config[c][sc];
							}
						});
					}else{
						defaultConfig[c] = config[c];
					}
				}else{
					defaultConfig[c] = config[c];
				}
			});
		}
		return JSON.parse(JSON.stringify(defaultConfig));;
	},
	get: function(item){
		if(typeof(item) == 'undefined') return undefined;
		var config = this.read();
		var data = eval( 'config.' + item );
		if( typeof(data) == 'string' ){
			var openGraph = data.indexOf("{{");
			while( openGraph > -1 ){
				var closedGraph = data.indexOf("}}");
				var variable = data.substring( openGraph + 2, closedGraph);
				var content = eval( 'config.' + variable );
				data = data.replace('{{' + variable + '}}', content);
				openGraph = data.indexOf("{{", closedGraph);
			}
		}
		return data;
	},
	getList: function(item){
		var list = this.get( item );
		// var notFound = true;
		// var self = this;
		// if(typeof list == 'object'){
		// 	list.forEach(function(f, i){
		// 		var file = self.get(item +'['+ i +']');
		// 		// if(!pathExists.sync(file)){
		// 		// 	file = path.join( __dirname, '../../',  self.get(item +'['+ i +']') );
		// 		// 	if(!pathExists.sync(file)) file = false;
		// 		// }
		// 		if(file) {
		// 			list[i] = path.join( __dirname, '../../',  self.get(item +'['+ i +']') );
		// 			notFound = false;
		// 		}
		// 	});
		// }
		return (typeof list == 'object') ? list : undefined;
	}
}