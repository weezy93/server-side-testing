// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/tv_shows'
  },

  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }

};
