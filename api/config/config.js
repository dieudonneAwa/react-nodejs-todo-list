require('dotenv').config();

module.exports = {
  development: {
    database: 'todo-dev',
    use_env_variables: 'DB_DEV_URL',
    dialect: 'postgres',
  },
  test: {
    database: 'todo-test',
    use_env_variables: 'DB_TEST_URL',
    dialect: 'postgres',
  },
  production: {
    database: 'todo-prod',
    use_env_variables: 'DB_PROD_URL',
    dialect: 'postgres',
  },
}