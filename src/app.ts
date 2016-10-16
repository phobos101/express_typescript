/// <reference path="./_all.d.ts" />

'use strict';

import * as bodyParser from 'body-parser';
import * as express from 'express';
import * as path from 'path';
import * as indexRoute from './routes/index';

/**
 *  The server
 * 
 *  @class Server
 */
class Server {
    public app: express.Application;

    /**
     * Bootstrap the application
     * 
     * @class Server
     * @method bootstrap
     * @static
     * @return {ng.auto.InjectorService} Returns the newly created injector for the app
     */
    public static bootstrap(): Server {
        return new Server();
    }

    /**
     * Constructor
     * 
     * @class Server
     * @constructor
     */
    constructor() {
        this.app = express();

        this.config();

        this.routes();
    }

    /**
     * Configure application
     *
     * @class Server
     * @method config
     * @return void
     */
    private config() {
        //configure jade
        this.app.set('views', path.join(__dirname, 'views'));
        this.app.set('view engine', 'jade');

        //mount logger
        //this.app.use(logger("dev"));

        //mount json form parser
        this.app.use(bodyParser.json());

        //mount query string parser
        this.app.use(bodyParser.urlencoded({ extended: true }));

        //add static paths
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use(express.static(path.join(__dirname, 'bower_components')));

        // catch 404 and forward to error handler
        this.app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
            let error = new Error('Not Found');
            err.status = 404;
            next(err);
        });
    }

    /**
     * Configure routes
     * 
     * @class Server
     * @method routes
     * @return void
     */
    private routes() {
        //get router
        let router: express.Router = express.Router();

        //get routes
        let index: indexRoute.Index = new indexRoute.Index();

        //home page
        router.get('/', index.render);

        //use router middleware
        this.app.use(router);
    }
}

let server = Server.bootstrap();
export = server.app;
