const config = {
  database: process.env.REACT_APP_DATABASE,
  server: process.env.REACT_APP_SERVER,
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};
export default config;
