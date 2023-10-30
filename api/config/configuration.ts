export default () => ({
  base_url: `${process.env.PROTOCOL || 'http'}://${
    process.env.HOST || 'localhost'
  }:${process.env.PORT || 3000}`,
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 5432,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    name: process.env.DB_NAME,
  },
});
