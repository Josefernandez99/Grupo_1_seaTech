'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {

        await queryInterface.bulkInsert('Categories', [
            {
                name: 'Velero'
            },
            {
                name: 'Lancha'
            },
            {
                name: 'Yate'
            },
            {
                name: 'Moto de Agua'
            }
        ], {});
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete('Categories', null, {});
    }
};
