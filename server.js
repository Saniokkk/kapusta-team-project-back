const mongoose = require("mongoose");
require("colors");

const app = require("./app");

const { DB_HOST, PORT = 5000 } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() =>
    app.listen(PORT, () => {
      console.log(
        `Server running. Use our API on port: ${PORT}, Database connection successful`
          .cyan.italic.underline
      );
    })
  )
  .catch((error) => {
    console.log(error.message.red);
    process.exit(1);
  });
