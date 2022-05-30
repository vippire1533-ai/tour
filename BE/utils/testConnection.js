import sql from 'mssql/msnodesqlv8';
import config from './../data/dbconfig';

const connectDatabase = async () => {
  try {
    console.log('Connecting.....');
    await sql.connect(config);
  } catch (error) {
    console.log(error);
  }
};

export default connectDatabase;
