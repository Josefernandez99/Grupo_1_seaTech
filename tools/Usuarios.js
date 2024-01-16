const fs = require("fs");
const path = require("path");

const Usuario = {
  filename: "../data/usuarios.json",

  getData: function () {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, this.filename), "utf-8")
    );
  },

  getId: function () {
    let allUsers = this.getData();

    if (allUsers) {
      return allUsers.pop().id + 1;
    }

    return 1;
  },

  findAll: function () {
    return this.getData();
  },
  findByPk: function (id) {
    let allUsers = this.findAll();

    return allUsers.find((oneProduct) => oneUser.id == id);
  },
  findByField: function (campo, valor) {
    let allUsers = this.findAll();

    return allUsers.filter((oneUser) => oneUser[campo] == valor);
  },
  create: function (newUser) {
    let allUsers = this.findAll();

    allUsers.push({
      id: this.getId(),
      ...newUser,
    });

    fs.writeFileSync(
      path.join(__dirname, this.filename),
      JSON.stringify(allUsers, null, " ")
    );

    return true;
  },
  update: function (userUpdate, id) {
    let allUsers = this.findAll();

    // Buscar el índice del objeto a actualizar
    let indexToUpdate = -1;
    for (let i = 0; i < allUsers.length; i++) {
      if (allUsers[i].id == id) {
        indexToUpdate = i;
        break;
      }
    }

    // Si no se encuentra el objeto, devolver false
    if (indexToUpdate === -1) {
      return false;
    }

    // Actualizar campos del objeto
    let oldUser = allUsers[indexToUpdate];
    console.log("Antes de la actualización:", oldUser);

    for (let field in userUpdate) {
      if (oldUser.hasOwnProperty(field)) {
        oldUser[field] = userUpdate[field];
      }
    }

    console.log("Después de la actualización:", oldUser);

    // Actualizar el array con el objeto modificado
    allUsers[indexToUpdate] = oldUser;

    // Guardar el array actualizado en el archivo JSON
    fs.writeFileSync(
      path.join(__dirname, this.filename),
      JSON.stringify(allUsers, null, " ")
    );

    return true;
  },
  delete: function (id) {
    let allUsers = this.findAll();
    let finalUsers = allUsers.filter((oneUser) => oneUser.id != id);
    fs.writeFileSync(
      path.join(__dirname, this.filename),
      JSON.stringify(finalUsers, null, " ")
    );
    return true;
  },
};

module.exports = Usuario;
