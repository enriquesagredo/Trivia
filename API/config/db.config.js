const mongoose = require("mongoose");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1/triviack";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.info("Successfully connected to the database ✅"))
  .catch((error) =>
    console.error("An error ocurred trying to connect to the database", error)
  );
