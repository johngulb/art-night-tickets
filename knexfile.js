// Update with your config settings.
require('dotenv').config({ path: '.env' });

const useEnvDb = process.env.DB_CONNECTION_STRING && process.env.DB_CLIENT;

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: useEnvDb
    ? {
        client: process.env.DB_CLIENT || 'sqlite3',
        connection: process.env.DB_CONNECTION_STRING || { filename: './dev.sqlite3' },
        migrations: { tableName: 'knex_migrations' },
      }
    : {
        client: 'sqlite3',
        connection: { filename: './dev.sqlite3' },
        migrations: { tableName: 'knex_migrations' },
      },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
