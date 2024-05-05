require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 9999
const viewEngine = require("./config/viewEngine.config");
const { trimInputs } = require('./middleware/Triminput')
const adminRoutes = require("./routes/admin/index.router");
const userRoutes = require("./routes/user/index.router");
app.set("views", `views`);
app.set("view engine", "pug");
//config req body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data
// app.use(trimInputs)
app.use(trimInputs)
//express-session
viewEngine(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
adminRoutes(app);
userRoutes(app);
