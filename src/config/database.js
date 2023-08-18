require('dotenv').config();

module.exports = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
    paranoid: true,
    // eslint-disable-next-line quote-props
    'createdAt': 'created_at',
    // eslint-disable-next-line quote-props
    'upadatedAt': 'updated_at',
    // eslint-disable-next-line quote-props
    'deletedAt': 'deleted_at',
  },
  dialectOptions: {
    timezone: 'America/Sao_Paulo',
  },
  timezone: 'America/Sao_Paulo',
};
