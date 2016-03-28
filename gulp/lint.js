const gulp = require("gulp");
const eslint = require("gulp-eslint");

module.exports = function(paths, config) {
    return function() {
        return gulp.src(paths)
            .pipe(eslint({ config }))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    };
};
