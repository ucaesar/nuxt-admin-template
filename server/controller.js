const fs = require('fs');
const path = require('path');

function addControllers(router, dir) {
    const fds = fs.readdirSync(path.join(__dirname, dir));
    const dirs = fds.filter(f => {
        return fs.lstatSync(path.join(__dirname, dir + '/' + f)).isDirectory();
    });
    const jsFiles = fds.filter(f => {
        return (
            fs.lstatSync(path.join(__dirname, dir + '/' + f)).isFile &&
            f.endsWith('.js')
        );
    });
    for (let d in dirs) {
        console.log(`process dir ${dir + '/' + dirs[d]} ...`);
        addControllers(router, dir + '/' + dirs[d]);
    }
    for (let f in jsFiles) {
        console.log(`process jsfile ${dir + '/' + jsFiles[f]} ...`);
    }
}

module.exports = addControllers;
