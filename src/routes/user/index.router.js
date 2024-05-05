const indexUser = require("./user")
module.exports = (app) => {
    app.use("/", indexUser);
};
