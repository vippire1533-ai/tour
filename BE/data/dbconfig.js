import dotenv from 'dotenv';

dotenv.config();

const devConfig = {
  database: process.env.CONFIG_DB,
  server: process.env.CONFIG_SERVER
};

const prodConfig = {
  database: process.env.HOST_DB,
  server: process.env.HOST_SERVER,
  username: process.env.HOST_USER,
  password: process.env.HOST_PASSWORD
};

let config = {
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true
  },
};

if (process.env.NODE_ENV.trim() !== 'production') {
  config = {
    ...config,
    ...devConfig
  };
} else {
  config = {
    ...config,
    ...prodConfig
  };
}

export default config;