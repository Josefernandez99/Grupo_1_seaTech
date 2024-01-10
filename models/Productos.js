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
    update: function (productUpdate, id) {

        let allProducts = this.findAll();

        // Buscar el índice del objeto a actualizar
        let indexToUpdate = -1;
        for (let i = 0; i < allProducts.length; i++) {
            if (allProducts[i].id == id) {
                indexToUpdate = i;
                break;
            }
        }

        // Si no se encuentra el objeto, devolver false
        if (indexToUpdate === -1) {
            return false;
        }

        // Actualizar campos del objeto
        let oldProduct = allProducts[indexToUpdate];
        console.log("Antes de la actualización:", oldProduct);

        for (let field in productUpdate) {
            if (oldProduct.hasOwnProperty(field)) {
                oldProduct[field] = productUpdate[field];
            }
        }

        console.log("Después de la actualización:", oldProduct);

        // Actualizar el array con el objeto modificado
        allProducts[indexToUpdate] = oldProduct;

        // Guardar el array actualizado en el archivo JSON
        fs.writeFileSync(path.join(__dirname, this.filename), JSON.stringify(allProducts, null, ' '));

        return true;

    },
    delete: function (id) {
        let allProducts = this.findAll();
        let finaProducts = allProducts.filter(oneProduct => oneProduct.id !== id);
        fs.writeFileSync(path.join(__dirname, this.filename), JSON.stringify(finalProducts, null, ' '));
        return true;
    }


}


module.exports = Producto;


