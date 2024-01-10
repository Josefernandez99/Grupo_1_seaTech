const fs = require('fs');
const path = require('path');

const Producto = {

    filename: '../data/productos.json',

    getData: function () {
        return JSON.parse(fs.readFileSync(path.join(__dirname, this.filename), 'utf-8'));
    },

    getId: function () {
        let allProducts = this.getData();

        if (allProducts) {
            return allProducts.pop().id + 1;
        }

        return 1;
    },

    findAll: function () {
        return this.getData();
    },
    findByPk: function (id) {
        let allProducts = this.findAll();

        return allProducts.find(oneProduct => oneProduct.id == id);
    },
    findByField: function (campo, valor) {
        let allProducts = this.findAll();

        return allProducts.filter(oneProduct => oneProduct[campo] == valor);
    },
    create: function (newProduct) {

        let allProducts = this.findAll();

        allProducts.push({
            id: this.getId(),
            ...newProduct
        });

        fs.writeFileSync(path.join(__dirname, this.filename), JSON.stringify(allProducts, null, ' '));

        return true;

    },
    update: function () {

    },
    delete: function () {

    }


}


module.exports = Producto;


