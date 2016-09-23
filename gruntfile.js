module.exports = function(grunt) {
	
	grunt.initConfig ({
		pkg: grunt.file.readJSON("package.json"),
		uglify: {
			dev: {
				options: {
					beautify: true,
					mangle: false,
					compress: false,
					preserveComments: "all"
				},
				src: "src/js/*.js",
				dest: "dist/js/webui.js"			
			},
			dist: {
				src: "src/js/*.js",
				dest: "dist/js/webui.min.js"
			}
		},
		sass: {
			dev: {
				options: {
					outputStyle: "expanded"
				},
				files: {
					"dist/css/webui.css" : "src/scss/webui-4.0.0.scss"
				}
			},
			dist: {
				options: {
					outputStyle: "compressed"
				},
				files: {
					"dist/css/webui.min.css" : "src/scss/webui-4.0.0.scss"
				}
			}
		},
		watch: {
			js: {
				files: ["src/js/*.js"],
				tasks: ["uglify:dev"]
			},
			css: {
				files: ["src/scss/**/*.scss"],
				tasks: ["sass:dev"]
			}
		}
	});
	
	
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-sass");
	grunt.loadNpmTasks("grunt-contrib-watch");
	
	
	grunt.registerTask("default", ["uglify:dev", "sass:dev"]);
	grunt.registerTask("build", ["uglify:dist", "sass:dist"]);
};