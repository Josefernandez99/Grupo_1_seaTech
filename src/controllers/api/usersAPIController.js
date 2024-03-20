const path = require('path');
const db = require('../../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");
const moment = require('moment');
const User = db.User; // Cambiar a modelo de usuario

const usersAPIController = {

    list: (req, res) => {
        User.findAll({})
            .then(users => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: users.length,
                        url: 'api/users'
                    },
                    data: users
                }
                res.json(respuesta);
            })
    },

    detail: (req, res) => {
        User.findByPk(req.params.id)
            .then(user => {
                let respuesta = {
                    meta: {
                        status: 200,
                        total: user ? 1 : 0, // Verificar si se encontró el usuario
                        url: '/api/user/:id'
                    },
                    data: user ? user : 'User not found' // Manejar el caso en que no se encuentre el usuario
                }
                res.json(respuesta);
            });
    },

    create: (req, res) => {
        db.User
            .create(
                {
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    address: req.body.address,
                    province: req.body.provincia,
                    phone: req.body.telefono,
                    email: req.body.email,
                    password: req.body.password,
                    rol: 2
                }
            )
            .then(user => {
                let respuesta;
                if (user) {
                    respuesta = {
                        meta: {
                            status: 200,
                            total: 1,
                            url: 'api/users/create'
                        },
                        data: user
                    }
                } else {
                    respuesta = {
                        meta: {
                            status: 400,
                            total: 0,
                            url: 'api/users/create'
                        },
                        error: 'Error creating user'
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    },

    update: (req, res) => {
        let userId = req.params.id;
        User.update(
            {
                first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    address: req.body.address,
                    province: req.body.provincia,
                    phone: req.body.telefono,
                    email: req.body.email,
                    password: req.body.password,
                    rol: 2
            },
            {
                where: { id: userId }
            })
            .then(confirm => {
                let respuesta;
                if (confirm[0] === 1) { // Verificar si se actualizó un registro
                    respuesta = {
                        meta: {
                            status: 200,
                            total: 1,
                            url: 'api/users/:id'
                        },
                        data: 'User updated successfully'
                    }
                } else {
                    respuesta = {
                        meta: {
                            status: 404,
                            total: 0,
                            url: 'api/users/update/:id'
                        },
                        error: 'User not found'
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    },

    destroy: (req, res) => {
        let userId = req.params.id;
        User
            .destroy({ where: { id: userId }}) 
            .then(confirm => {
                let respuesta;
                if (confirm === 1) { // Verificar si se eliminó un registro
                    respuesta = {
                        meta: {
                            status: 200,
                            total: 1,
                            url: 'api/users/delete/:id'
                        },
                        data: 'User deleted successfully'
                    }
                } else {
                    respuesta = {
                        meta: {
                            status: 404,
                            total: 0,
                            url: 'api/users/destroy/:id'
                        },
                        error: 'User not found'
                    }
                }
                res.json(respuesta);
            })
            .catch(error => res.send(error))
    }

}

module.exports = usersAPIController;