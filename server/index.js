const mongoose = require("mongoose");
require("dotenv").config();

// SAFETY NET UNCAUGHT EXCEPTIONS
// DO NOT RELY: CATCH THE ERRORS
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXECEPTION: ", err.name, err.message);
  process.exit(1);
});
const app = require("./app");

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DB_URI, { useNewUrlParser: true })
  .then(() => console.log("DB CONNECTED"))
  .catch((err) => console.log(err));

const PORT = (process.env.NODE_ENV = "development" ? 3002 : process.env.PORT);

const server = app.listen(PORT, (err) =>
  err ? console.log(err) : console.log("SERVER SPINNING")
);

// SAFETY NET UNHANDLED REJECTIONS
// DO NOT RELY: CATCH THE ERRORS
process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION: ", err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
