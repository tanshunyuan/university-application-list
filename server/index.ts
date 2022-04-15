import "dotenv/config";
import { models, connectDb } from "./model";
import {
  getAllUniversities,
  getUniversitiesByCountry,
} from "./model/university";
import * as express from "express";
import * as cors from "cors";

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL!;

const app = express();
const formatResponse = (item: any) => {
  return { data: item };
};
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", async (req: express.Request, res: express.Response) => {
  const { country, limit, page } = req.query;
  if (country !== undefined && typeof country === "string" && country !== "") {
    const result = await getUniversitiesByCountry(country);
    res.status(200).json(formatResponse(result));
  }
  const result = await getAllUniversities();
  // res.status(200).json(formatResponse(result));
});

connectDb(DATABASE_URL).then(async () => {
  app.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
  });
});
