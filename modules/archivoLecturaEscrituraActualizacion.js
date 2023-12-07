const file = {
  fileRead(localization) {
    //leer un archivo
    const fs = require("fs");
    const path = require("path");
    let route = path.join(__dirname, localization);
    let file = fs.readFileSync(route, "utf-8");
    file = JSON.parse(file);
    return file;
  },

  fileWrite(localization, content) {
    //escribir un archivo
    const fs = require("fs");
    const path = require("path");
    content = JSON.stringify(content);
    let route = path.join(__dirname, localization);
    fs.writeFileSync(route, content);
  },

  fileUpdate(localization, content) {
    //actualiza un archivo
    let fileRead = this.fileRead(localization);
    fileRead.push(content);
    file.fileWrite(localization, fileRead);
  },
};

module.exports = file;
