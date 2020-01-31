
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('TodoItems', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    text: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    todoId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'Todos',
        key: 'id'
      }
    },
    isCompleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('TodoItems')
};
