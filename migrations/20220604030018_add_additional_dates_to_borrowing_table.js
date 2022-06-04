'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    return [
      queryInterface.addColumn(
        'Borrowings',
        'date_confirmed', 
        {
          type: Sequelize.DATE,
          allowNull: true,
          after: "date_borrowed"
        }
      ),
      queryInterface.addColumn(
        'Borrowings',
        'date_refused', 
        {
          type: Sequelize.DATE,
          allowNull: true,
          after: "date_returned"
        }
      ),
    ]
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    return [
      queryInterface.removeColumn('Borrowings', 'date_confirmed'),
      queryInterface.removeColumn('Borrowings', 'date_refused')
    ];
  }
};