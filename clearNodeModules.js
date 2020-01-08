/* eslint-disable */
// prettier-ignore.

const fs = require("fs");

const startTime = new Date().getTime();

const walk = (dir, done) => {
  let results = [];
  fs.readdir(dir, (err, list) => {
    if (!!~dir.indexOf("node_modules") || !!~dir.indexOf("dist")) {
      const rimraf = require("rimraf");
      rimraf.sync(dir);
      console.log(`${dir} удалены`);
    }
    if (err) return done(err);
    let i = 0;
    (function next() {
      let file = list[i++];
      if (!file) return done(null, results);
      file = `${dir}/${file}`;
      fs.stat(file, (err, stat) => {
        if (stat && stat.isDirectory()) {
          walk(file, (err, res) => {
            //results = results.concat(res);
            // console.warn();
            next();
          });
        } else {
          //results.push(file);
          if (
            (!!~file.indexOf("yarn.lock") || !!~file.indexOf("package-lock.json")) &&
            stat.isFile()
          ) {
            const rimraf = require("rimraf");
            rimraf.sync(file);
            console.log(`${file} удален`);
          }

          next();
        }
      });
    })();
  });
};

function done(err, result) {
  if (err) {
    console.warn("Ошибка");
    console.warn(err);
    return;
  }

  console.warn(`Все модули удалены, за ${(new Date().getTime() - startTime) / 1000} сек`);
}

walk(__dirname, done);
