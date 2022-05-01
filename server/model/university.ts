import * as mongoose from "mongoose";
import { Schema } from "mongoose";
import { IUniversity, IUniversityResult } from "../types/university.type";

const UniversitySchema = new mongoose.Schema<IUniversity>({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
  updated_at: {
    type: Date,
    default: new Date(),
  },
  "state-province": { type: String, default: null },
  country: {
    type: String,
    required: true,
    trim: true,
  },
  domains: [String],
  web_pages: [String],
});
const University = mongoose.model<IUniversity>("University", UniversitySchema);

export const createUniversity = async (data: IUniversity) => {
  try {
    const result = await new University(data).save();
    return { university: result, error: null };
  } catch (error) {
    return { university: null, error };
  }
};

export const updateUniversity = async (id: string, data: IUniversity) => {
  try {
    const result = await University.findByIdAndUpdate(id, data);
    return { university: result, error: null };
  } catch (error) {
    return { university: null, error };
  }
};

export const getUniversities = async (
  country: string,
  limit: number,
  page_num: number
): Promise<IUniversityResult> => {
  let results: IUniversityResult = { universities: null, error: null };
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
