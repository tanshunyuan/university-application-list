import "dotenv/config";
import { models, connectDb } from "./model";
import {
  getAllUniversities,
  getUniversitiesByCountry,
  meme,
} from "./model/university";
import * as express from "express";
import * as cors from "cors";

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL!;

const app = express();
app.use(
  cors({
    origin: "*",
  })
);

app.get("/", async (req: express.Request, res: express.Response) => {
  const { country, limit, page } = req.query;
  // if (country !== undefined && typeof country === "string" && country !== "") {
  //   const result = await getUniversitiesByCountry(country);
  //   res.status(200).json(formatResponse(result));
  // }
  const nLimit = Number(limit);
  const nPage = Number(page);
  const nCountry = country?.toString();
  const { total, results } = await meme(nCountry, nLimit, nPage);
  let totalCount = 0;
  if (total[0] !== undefined) {
    totalCount = total[0].totalCount;
  }

  const nextPage = nPage + 1;
  const prevPage = nPage - 1;
  const lastPage = Math.ceil(totalCount / nLimit);
  res.status(200).json({
    current_page: page,
    per_page: limit,
    next_page: nextPage < lastPage ? nextPage : null,
    prev_page: prevPage === 0 ? null : prevPage,
    last_page: lastPage,
    data: results,
    total: totalCount,
  });
});

connectDb(DATABASE_URL).then(async () => {
  app.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
  });
});
