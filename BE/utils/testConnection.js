import sql from 'mssql/msnodesqlv8';

const config = {
  user: 'sa',
  password: '153246789sST',
  server: '157.245.59.209',
  database: 'tour'
};

const connectDatabase = async () => {
  try {
    console.log('Connecting.....');
    await sql.connect(config);
  } catch (error) {
    console.log(error);
  }
};

export default connectDatabase;