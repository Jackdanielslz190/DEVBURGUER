'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.createTable('products', 'category_id',{
      type: Sequelize.INTEGER,
      referencies: {
        model: "categories",
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
      allowNull: true,
     });
     
  },

  async down (queryInterface,) {
   
     await queryInterface.removeColumn('products', 'category_id');
    
  }
};
