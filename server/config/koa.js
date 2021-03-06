"use strict";
const path = require("path");
const logger = require("koa-logger");
const responeTime = require("koa-response-time");
const bodyParser = require("koa-bodyparser");
const compress = require("koa-compress");
const serve = require("koa-static");
const favicon = require("koa-favicon");
const session = require("koa-generic-session");
const MongoStore = require("koa-generic-session-mongo");
const csrf = require("koa-csrf");
const cors = require("koa-cors");
const views = require("co-views");

// Bootstrap models
require("../models/index");

module.exports = (app, passport) => {
    app.use(responeTime());
    app.use(compress());
    app.use(bodyParser());
    app.use(cors());

    app.use(favicon(path.resolve(__dirname, "../../public/img/favicon.png")));
    app.use(serve(path.resolve(__dirname, "../../public")));
    app.use(function* (next) {
        this.render = views(path.resolve(__dirname, "..", "views"), {
            map: { hjs: "hogan" },
            cache: (process.env.NODE_ENV !== "DEV"),
        });
        yield next;
    });

    app.proxy = true;
    app.keys = [process.env.SESSION_SECRET];
    app.use(session({
        cookie: {
            httpOnly: true,
            signed: true,
        },
        store: new MongoStore({
            url: process.env.DB,
        }),
    }));

    csrf(app);
    app.use(csrf.middleware);

    app.use(passport.initialize());
    app.use(passport.session());

    // Configure hot reloading
    if (process.env.NODE_ENV === "DEV") {
        app.use(logger());

        const devMiddleware = require("koa-webpack-dev-middleware");
        const hotMiddleware = require("koa-webpack-hot-middleware");
        const webpackConfig = require("../../webpack/app/app.dev.js");
        const compiler = require("webpack")(webpackConfig);

        app.use(devMiddleware(compiler, {
            publicPath: webpackConfig.output.publicPath,
            quiet: true,
        }));

        app.use(hotMiddleware(compiler, {
            path: "/__webpack_hmr",
            quiet: true,
            reload: true,
            heartbeat: 10 * 1000,
            timeout: 20 * 1000,
        }));
    }
};
