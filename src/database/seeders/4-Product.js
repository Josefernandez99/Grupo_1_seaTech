'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.bulkInsert('Products', [
            {
                id_category: 3,
                id_user: 1,
                name: "Estrella Azul",
                description: "Asientos acolchados y cómodos",
                image: JSON.stringify({
                    public_id: "seatech/uhflq2xllzndhylrtlmo",
                    url: "https://res.cloudinary.com/draudtuyr/image/upload/v1705370353/seatech/uhflq2xllzndhylrtlmo.png"
                }),
                state_embarcation: "Usado",
                price: 73743.56,
                year: 1997
            },
            {
                id_category: 3,
                id_user: 1,
                name: "El Dorado",
                description: "Motor potente de 200 caballos de fuerza\r\n\r\nMás cosas",
                image: JSON.stringify({
                    public_id: "seatech/sodkuz9jubzku7lowocx",
                    url: "https://res.cloudinary.com/draudtuyr/image/upload/v1705370352/seatech/sodkuz9jubzku7lowocx.png"
                }),
                state_embarcation: "Usado",
                price: 35421.67,
                year: 1996
            },
            {
                id_category: 3,
                id_user: 1,
                name: "Estrella del Mar",
                description: "Luces de navegación LED",
                image: JSON.stringify({
                    public_id: "seatech/jq2rclkaubc1ww4lm4s3",
                    url: "https://res.cloudinary.com/draudtuyr/image/upload/v1705773468/seatech/jq2rclkaubc1ww4lm4s3.jpg"
                }),
                state_embarcation: "Usado",
                price: 79429.44,
                year: 2010
            },
            {
                id_category: 4,
                id_user: 1,
                name: "Mariposa",
                description: "Ancla y cabrestante eléctrico",
                image: JSON.stringify({
                    public_id: "seatech/vyl6qx7bjfzlvxrxtjbl",
                    url: "https://res.cloudinary.com/draudtuyr/image/upload/v1705370352/seatech/vyl6qx7bjfzlvxrxtjbl.png"
                }),
                state_embarcation: "Nuevo",
                price: 53704.7,
                year: 1989
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Products', null, {});
    }
};
