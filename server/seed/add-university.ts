import * as dotenv from "dotenv";
import * as mongoose from "mongoose";
import * as path from "path";

import * as UNIVERSITY_DATAS from "./data.json";
import { connectDb } from "../model";
import University from "../model/university";

dotenv.config({ path: path.join(__dirname, "..", ".env") });
const DATABASE_URL = process.env.DATABASE_URL!;
const UniversityList = UNIVERSITY_DATAS.data.map((data: any) => {
  const {
    name,
    country,
    web_pages,
    domains,
    created_at,
    updated_at,
  } = data;
  return new University({
    name,
    country,
    web_pages,
    domains,
    created_at,
    updated_at,
  });
});

const SeedUniversities = async () => {
  for (const University of UniversityList) {
    await University.save();
  }
};
const seedDb = async () => {
  await University.deleteMany({});
  await SeedUniversities();
};

connectDb(DATABASE_URL);

seedDb().then(() => {
  mongoose.connection.close();
});
