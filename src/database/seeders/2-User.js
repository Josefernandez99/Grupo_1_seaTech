'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Users', [
      {
        first_name: 'John',
        last_name: 'Doe',
        address: 'El País de Nunca Jamas',
        province: 'San_Juan',
        phone: '+54 9 1111111111',
        email: 'test@test.com',
        password: '$2a$10$LApqYUN4VTkOenBfS8/Fnua185E7EEOMTBBLrFvlq1OtY2hmCxw.i',
        rol: 2
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
