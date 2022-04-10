const mongoose = require("mongoose");
import University from "./university";

export const connectDb = (url: string) => {
  return mongoose
    .connect(url)
    .then(() => {
      console.log("Mongodb connected....");
    })
    .catch((err: Error) => console.log(err.message));
};

export const models = { University };
