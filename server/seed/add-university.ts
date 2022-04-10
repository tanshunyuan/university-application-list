import University from "../model/university";
import * as UNIVERSITY_DATAS from "./data.json";

const UniversityList = UNIVERSITY_DATAS.data.map((data) => {
  const {
    name,
    country,
    alpha_two_code,
    web_pages,
    domains,
    created_at,
    updated_at,
  } = data;
  return new University({
    name,
    country,
    alpha_two_code,
    web_pages,
    domains,
    created_at,
    updated_at,
  });
});

export const SeedUniversities = async () => {
  for (let i = 0; i < UniversityList.length; i++) {
    await UniversityList[i].save();
  }
};
