import * as KoaI from 'koa';
import { getLogger } from './log';
import { Server as HttpServer } from 'http';
import { PublicRouter } from './routes';
import DatabaseManager from './sqlite-config';
const Koa = require('koa');
const bodyparser: any = require('koa-bodyparser');
const cors = require('@koa/cors');
const logger = getLogger('Config Koa app');

export class DWBIServer {
  public listeningServer: HttpServer;
  public port = '3000';
  private app: KoaI;
  constructor(){
    this.app = new Koa();

    this.app.use(bodyparser());

    this.app.use(
      cors({
        exposeHeaders: ['location'],
      })
    );

    this.app.use(
      cors({
        exposeHeaders: ['location'],
      })
    );

    this.app.use(async (ctx, next) => {
      try {
        logger.info(`Api request - Start: ${ctx.method}${ctx.url}`);
        await next();
        logger.info(`Api request - End: ${ctx.method}${ctx.url}`);
      } catch (err) {
        logger.info(`Api request - Error: ${ctx.method}${ctx.url}`);
        logger.error(err);
        ctx.status = err.status || 500;
        ctx.body = err.operationOutcome || err.message;
        ctx.app.emit('error', err, ctx);
      }
    });

    const publicRouter = new PublicRouter({});
    this.app.use(publicRouter.routes()).use(publicRouter.allowedMethods());
  }
  public async start() {
    // Initialize SQLite database
    try {
      const db = DatabaseManager.getInstance();
      await db.initDatabase();
      logger.info('SQLite database initialized successfully');
    } catch (error) {
      logger.error('Failed to initialize SQLite database:', error);
      // Continue without database
    }

    this.listeningServer = this.app.listen(this.port, (error?: any) => {
      if (error) {
        logger.info('Error while trying to open server.', error);
        return;
      }
      logger.info(`Server started on port ${this.port}`);
    });

    return this.listeningServer;
  }
}