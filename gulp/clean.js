const del = require("del");

module.exports = function(done) {
    del(["!public", "public/**/*.js", "public/**/*.map"]).then(paths => {
        console.log("Deleted files and folders:\n", paths.join("\n"));
        done();
    });
};
