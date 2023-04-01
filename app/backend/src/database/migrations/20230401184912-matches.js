'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
        id: {
          autoIncrement: true,
          allowNull: false,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        home_team_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model:'teams',
            key: 'id',
          },
        },
        home_team_goals: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        away_team_id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          references:{
            model:'teams',
            key: 'id',
          },
        },
        away_team_goals: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        in_progress: {
          type: Sequelize.BOOLEAN,
          allowNull: false,
        },
          });
      },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};
