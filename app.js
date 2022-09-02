const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config()
require("colors")
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

require("dotenv").config();

// const { application } = require("express");

const {
  authRouter,
  // googleRouter,
  balanceRouter,
  transactionsRouter,
} = require("./routers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/users", authRouter);
// app.use("/api/googleauth", googleRouter);
app.use("/api/balance", balanceRouter);
app.use("/api/transactions", transactionsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
