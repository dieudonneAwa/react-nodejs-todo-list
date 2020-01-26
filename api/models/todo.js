module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {});
  Todo.associate = (models) => {
    // associations can be defined here
    Todo.belongsTo(models.User, {
      as: 'user',
      foreignKey: 'userId'
    });
    Todo.hasMany(models.TodoItem, {
      as: 'todoItems',
      foreignKey: 'todoId'
    });
  };
  return Todo;
};
