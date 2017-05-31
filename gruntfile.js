
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
				files: {
					"dist/js/webui.js" : ["src/js/main.js", 
											"src/js/_menus.js", 
											"src/js/_alerts.js", 
											"src/js/_tooltips.js", 
											"src/js/_modals.js", 
											"src/js/_upload.js", 
											"src/js/_tabs.js",
											"src/js/_shapes.js"],
					"dist/js/webui-utils.js" : "src/js/utils.js",
					"dist/js/webui-validation.js" : "src/js/validation.js"
				}
			},
			dist: {
				files: {
					"dist/js/webui.min.js" : ["src/js/main.js", 
												"src/js/_menus.js", 
												"src/js/_alerts.js", 
												"src/js/_tooltips.js", 
												"src/js/_modals.js", 
												"src/js/_upload.js", 
												"src/js/_tabs.js",
												"src/js/_shapes.js"],
					"dist/js/webui-utils.min.js" : "src/js/utils.js",
					"dist/js/webui-validation.min.js" : "src/js/validation.js"
				}
			}
		},
		sass: {
			dev: {
				options: {
					outputStyle: "expanded"
				},
				files: {
					"dist/css/webui.css" : "src/scss/webui.scss"
				}
			},
			dist: {
				options: {
					outputStyle: "compressed"
				},
				files: {
					"dist/css/webui.min.css" : "src/scss/webui.scss"
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