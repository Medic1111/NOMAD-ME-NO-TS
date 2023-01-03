const mongoose = require("mongoose");
require("dotenv").config();
const app = require("./app");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

const PORT = (process.env.NODE_ENV = "development" ? 3002 : process.env.PORT);

app.listen(PORT, (err) =>
  err ? console.log(err) : console.log("SERVER SPINNING")
);
