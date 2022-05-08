import dotenv from 'dotenv';
dotenv.config();

const dbConfiguration = {
  database: process.env.CONFIG_DB,
  server: process.env.CONFIG_SERVER,
  driver: 'msnodesqlv8',
  dialect: 'mssql',
  options: {
    enableArithAort: true,
    trustedConnection: true,
  },
  connectionTimeout: process.env.CONFIG_CONNECTION_TIMEOUT,
  pool: {
    max: +process.env.CONFIG_POOL_MAX,
    min: +process.env.CONFIG_POOL_MIN,
    idleTimeoutMillis: +process.env.CONFIG_IDLE_TIMEOUT,
  },
};

export default dbConfiguration;
