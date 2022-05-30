import sql from 'mssql/msnodesqlv8';
import config from './../data/dbconfig';

const connectDatabase = async () => {
  try {
    console.log('Connecting.....');
    console.log('config', config);
    const pool = await sql.connect(config);
    console.log('pool', pool);
  } catch (error) {
    console.log(error);
  }
};

export default connectDatabase;
