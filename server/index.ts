import "dotenv/config";
import { models, connectDb } from "./model";
import { SeedUniversities } from "./seed/add-university";

const express = require("express");
const app = express();

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL!;

connectDb(DATABASE_URL).then(async () => {
  //   await SeedUniversities();
  app.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
  });
});
