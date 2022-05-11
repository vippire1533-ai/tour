import dotenv from 'dotenv';

dotenv.config();

const config = {
  database: process.env.CONFIG_DB,
  server: process.env.CONFIG_SERVER,
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  },
};
export default config;