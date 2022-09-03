const mongoose = require("mongoose");

const app = require("./app");

const { DB_HOST, PORT = 5000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `Server running. Use our API on port: ${PORT}, Database connection successful`
      );
    })
  )
  .catch((error) => {
    console.log(error.message.red);
    process.exit(1);
  });
