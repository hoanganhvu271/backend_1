require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = process.env.PORT || 9999

const viewEngine = require("./config/viewEngine.config");
// const mainRoutes = require("./routes/main.route");
const apiRoutes = require("./routes/api.route");
// const { connection } = require("./config/connectDB");

const adminRoutes = require("./routes/admin/index.router");
const userRoutes = require("./routes/user/index.router");
//test connection
// connection();

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// app.use(bodyParser.json());

app.set("views", `views`);
app.set("view engine", "pug");
//config req body
app.use(express.json()); // for json
app.use(express.urlencoded({ extended: true })); // for form data
// app.use(trimInputs)

app.use("/api", apiRoutes);
//express-session
viewEngine(app);
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
adminRoutes(app);
userRoutes(app);
