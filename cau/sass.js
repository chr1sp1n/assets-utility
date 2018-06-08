'use strict';

const gulp = require('gulp');
var config = require('./config-reader');
config = config.read();
const notifier = require('./notifier');


var sass = require("gulp-sass");
var sourcemaps = require("gulp-sourcemaps");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var cssnano = require("cssnano");

var scan = function(obj)
{
    var k;
    if (obj instanceof Object) {
        for (k in obj){
            if (obj.hasOwnProperty(k)){
				console.log('obj: ',obj[k]);
                //recursive call to scan property
                scan( obj[k] );  
            }                
        }
    } else {
		console.log('prop: ',obj[k]);
        //not an Object so obj[k] here is a value
    };

};

var scaffolding = function(scssPath){
	
	const base = '../';

	scan(scssPath);

	// gulp.src( base, {read: false})
	// 	.pipe( gulp.dest('./source').on( "error", notifier.error()) );
	
}


module.exports = {
	dev: function(done) {
		
		scaffolding(config.source);

		// gulp.src(config.source.scss+"**/*.scss")
		// 	.pipe( sourcemaps.init() )
		// 	.pipe( 
		// 		sass()
		// 			.on( "error", function(err){
		// 				console.log(err);
		// 			})//notifier.error() ) 
		// 	)
		// 	// .pipe( 
		// 	// 	postcss([
		// 	// 		autoprefixer(),
		// 	// 		cssnano()
		// 	// 	])
		// 	// )
		// 	.pipe(sourcemaps.write())
		// 	.pipe( 
		// 		gulp.dest(config.temp_path + config.theme.machine_name + '/css/') 
		// 			.on( "error", notifier.error() )
		// 	);
		done();
	},
	dist: function (done) {		
		gulp.src(config.source.scss+"**/*.scss")
			//.pipe( sourcemaps.init() )
			.pipe( 
				sass()
					.on( "error", notifier.error() ) 
			)
			.pipe( 
				postcss([
					autoprefixer(),
					cssnano()
				])
			)
			//.pipe(sourcemaps.write())
			.pipe(
				gulp.dest(config.temp_path + config.theme.machine_name + '/css/')
					.on( "error", notifier.error() )
			);	
		done();
	}
}