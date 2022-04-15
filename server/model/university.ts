import * as mongoose from "mongoose";

const universitySchema = new mongoose.Schema({
  name: String,
  alpha_two_code: String,
  created_at: Date,
  updated_at: Date,
  "state-province": String || null,
  country: String,
  domains: [String],
  web_pages: [String],
});
const University = mongoose.model("University", universitySchema);

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

export default University;
