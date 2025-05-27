import oracledb from 'oracledb';
import { getLogger } from './log';
const logger = getLogger('Config Koa app');

// oracledb.initOracleClient?.({ libDir: 'C:\\oracle\\instantclient_19_11' }); // Optional, if not set in PATH

export const poolConfig = {
  user: 'user_db',
  password: 'parola123',
  connectString: 'localhost:1521/homedb1pdb',
  poolMin: 1,
  poolMax: 5,
  poolIncrement: 1,
};

export async function initPool() {
  try {
    await oracledb.createPool(poolConfig);
    logger.info(`Connected to Oracle Database on ${poolConfig.connectString}`)
  } catch (err) {
    console.error('❌ Failed to create pool:', err);
    throw err;
  }
}

export async function getConnection() {
  return oracledb.getConnection(); 
}
