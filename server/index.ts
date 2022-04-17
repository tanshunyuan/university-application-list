import "dotenv/config";
import { models, connectDb } from "./model";
import {
  getAllUniversities,
  getUniversitiesByCountry,
  meme,
} from "./model/university";
import * as express from "express";
import * as cors from "cors";
import { Query } from "express-serve-static-core";

const PORT = process.env.PORT;
const DATABASE_URL = process.env.DATABASE_URL!;

const app = express();
app.use(
  cors({
    origin: "*",
  })
);


app.get("/", async (req: express.Request, res: express.Response) => {
  const country = req.query.country?.toString() || "";
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;

  const { universities, error } = await meme(country, limit, page);
  if (universities !== null && error === null) {
    const { results, total } = universities;
    let count = 0;
    if(total.some(e => e.hasOwnProperty('totalCount'))){
      count = total[0].totalCount
    }
    const nextPage = page + 1;
    const prevPage = page - 1;
    const lastPage = Math.ceil(count / limit);
    res.status(200).json({
      current_page: page,
      per_page: limit,
      next_page: nextPage < lastPage ? nextPage : null,
      prev_page: prevPage === 0 ? null : prevPage,
      last_page: lastPage,
      data: results,
      total: count,
    });
    return;
  }
  res.status(400).json({error, message:'Something Went Wrong'});
});

connectDb(DATABASE_URL).then(async () => {
  app.listen(PORT, () => {
    console.log(`server listening at ${PORT}`);
  });
});
