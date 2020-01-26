module.exports = (sequelize, DataTypes) => {
  const TodoItem = sequelize.define('TodoItem', {
    text: DataTypes.STRING,
    todoId: DataTypes.INTEGER,
    isCompleted: DataTypes.BOOLEAN
  }, {});
  TodoItem.associate = (models) => {
    // associations can be defined here
    TodoItem.belongsTo(models.Todo, {
      as: 'todo',
      foreignKey: 'todoId'
    });
  };
  return TodoItem;
};
