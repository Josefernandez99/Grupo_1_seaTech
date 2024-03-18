const path = require('path');
const db = require('../../database/models');
// const sequelize = db.sequelize;
// const { Op } = require("sequelize");
// const moment = require('moment');
const Op = DB.Sequelize.Op;

const Product = db.Product;


const productsAPIController = {

    list: (req, res) => {
        db.Product.findAll({})
            .then(products => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: products.length,
                        url: 'api/products'
                    },
                    data: products
                }
                res.json(respuesta);
            })
    },

    'detail': (req, res) => {
        db.Product.findByPk(req.params.id)
            .then(product => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: product.length,
                        url: '/api/product/:id'
                    },
                    data: product
                }
                res.json(respuesta);
            });
    },

    create: (req, res) => {

        console.log('create', req.body, req.params)
        db.Product
            .create(
                {
                    name: req.body.name,
                    description: req.body.description,
                    image: req.file.image,
                    state_embarcation: req.body.state_embarcation,
                    price: req.body.price,
                    year: req.body.year,
                }
            )
            .then(confirm => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/products/create'
                        },
                        data: confirm
                    }
                }
                else {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/products/create'
                        },
                        data: confirm
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    },

    update: (req, res) => {
        let productId = req.params.id;
        console.log(productId)
        console.log(req.body)
        Product.update(
            {
                name: req.body.name,
                description: req.body.description,
                image: req.file.image,
                state_embarcation: req.body.state_embarcation,
                price: req.body.price,
                year: req.body.year,
            },
            {
                where: { id: productId }
            })
            .then(confirm => {
                let respuesta;
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/products/:id'
                        },
                        data: confirm
                    }
                }
                else {
                    respuesta = {
                        meta: {
                            status: 204,
                            total: confirm.length,
                            url: 'api/products/update/:id'
                        },
                        data: confirm
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    },

    destroy: (req, res) => {
        let productId = req.params.id;
        console.log(productId)
        db.Product
            .destroy({ where: { id: productId }, force: true }) // force: true es para asegurar que se ejecute la acción
            .then(confirm => {
                let respuesta;
                console.log('confirm', confirm)
                if (confirm) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: confirm.length,
                            url: 'api/products/delete/:id'
                        },
                        data: confirm
                    }
                }
                else {
                    respuesta = {
                        meta: {
                            status: 204,
                            total: confirm.length,
                            url: 'api/products/destroy/:id'
                        },
                        data: confirm
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    }

}

module.exports = productsAPIController;