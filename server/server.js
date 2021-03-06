const koa = require("koa");
const mongoose = require("mongoose");
const passport = require("passport");
const bootstrapPassport = require("./config/passport");
const bootstrapKoa = require("./config/koa");
const bootstrapRoutes = require("./config/routes");
const LOGGER = require("./lib/logger");

const app = koa();
bootstrapPassport(app, passport);
bootstrapKoa(app, passport);
bootstrapRoutes(app);

const listen = () => {
    app.listen(process.env.PORT);
    LOGGER.info(`Server starting on port: ${process.env.PORT}`);
};

const connect = () => {
    mongoose.connect(process.env.DB);
    return mongoose.connection;
};

if (!module.parent) {
    connect()
        .on("error", () => { LOGGER.error(`Failed to connect to mongodb server: ${process.env.DB}`); })
        .on("open", listen);
}
