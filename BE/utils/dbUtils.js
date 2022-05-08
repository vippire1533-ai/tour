import mssql from 'mssql/msnodesqlv8';
import dbConfiguration from '../configs/dbConfig';
import logger from './logger';

const dbUtils = {
  runQuery: async (query) => {
    try {
      console.log(dbConfiguration);
      const pool = await mssql.connect(dbConfiguration);
      return pool.query(query);
    } catch (error) {
      logger(`An error occurred while executing query: \n${ query }`, true);
      logger(`Error`, error.message, true);
    }
  },
  connectDatabase: async () => {
    try {
      await mssql.connect(dbConfiguration);
      logger('Connection Established', 'Successfully!!');
    } catch (error) {
      logger('Connection Error', `An error occurred while connecting: \n${ error.message }`, true);
    }
  }
};

export default dbUtils;
