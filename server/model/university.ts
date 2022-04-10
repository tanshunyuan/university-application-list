const mongoose = require("mongoose");

const universitySchema = new mongoose.Schema({
  name: String,
  alpha_two_code: String,
  created_at: Date,
  updated_at: Date,
  "state-province": String || null,
  domains: [String],
  web_pages: [String],
});
const University = mongoose.model("University", universitySchema);


export default University;
