var gulp = require("gulp");
var babel = require('gulp-babel'); //es6转es5
var uglify = require("gulp-uglify");  //压缩js

gulp.task("jsTask",function(){
	gulp.src("src/js2/*.js")
	.pipe(babel({"presets": ["es2015"]})) //es6转es5
	.pipe(uglify())
	.pipe(gulp.dest("dest/js2"))
});


gulp.task("default",["jsTask"]);


