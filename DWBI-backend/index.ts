import { initPool } from "./dbconfig";
import { getLogger } from "./log";
import { DWBIServer } from "./server";
import oracledb from "oracledb";

const logger = getLogger('Starting app');

async function start () {
  try{
    await initPool();
    const server = new DWBIServer();
    await server.start();

    // Graceful shutdown on process exit
    process.on('SIGINT', async () => {
      logger.info('Shutting down server...');
      await oracledb.getPool().close(10); // 10 seconds timeout
      process.exit(0);
    });
  } catch (error) {
    logger.error(`Cannot start app: ${error.stack}`);
  }
}

start();