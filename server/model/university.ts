import * as mongoose from "mongoose";
import { Schema, Types } from "mongoose";

interface IUniversity {
  name: string;
  alpha_two_code: string;
  created_at: Date;
  updated_at: Date;
  "state-province": string | null;
  country: string;
  domains: Array<string>;
  web_pages: Array<string>;
}

const universitySchema = new mongoose.Schema<IUniversity>({
  name: String,
  alpha_two_code: String,
  created_at: Date,
  updated_at: Date,
  "state-province": String || null,
  country: String,
  domains: [String],
  web_pages: [String],
});
const University = mongoose.model<IUniversity>("University", universitySchema);

export const getAllUniversities = async () => {
  const universities = await University.find({});
  console.log(" all universities", universities);
  return universities;
};

export const getUniversitiesByCountry = async (country: string) => {
  const universities = await University.find({ country });
  console.log("universities", universities);
  return universities;
};

interface IUniversity {
  _id: Types.ObjectId;
  alpha_two_code: string;
  country: string;
  created_at: Date;
  updated_at: Date;
  "state-province": string | null;
  domains: Array<string>;
  name: string;
  web_pages: Array<string>;
}

interface IResult {
  universities: {
    results: IUniversity[] | [];
    total: Array<{ totalCount: number }> | [];
  } | null;
  error: unknown | null;
}

export const meme = async (
  country: string,
  limit: number,
  page_num: number
): Promise<IResult> => {
  let results: IResult = { universities: null, error: null };
  try {
    const skips = limit * (page_num - 1);

    const universities = await University.aggregate()
      .facet({
        results: [{ $match: { country } }, { $skip: skips }, { $limit: limit }],
        total: [{ $match: { country } }, { $count: "totalCount" }],
      })
      .exec()
      .then((results) => results[0]);
    results.universities = universities;
  } catch (error) {
    results.error = error;
  }
  return results;
};

export default University;
