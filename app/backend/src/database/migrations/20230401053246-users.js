'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   await queryInterface.createTable('users', {
        id: {
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        role: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false,
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false,
        },
          });
      },

  async down (queryInterface, Sequelize) {
   await queryInterface.dropTable('users');
  }
};
