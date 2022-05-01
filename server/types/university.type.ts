import { Types } from "mongoose";
export interface IUniversity {
  _id?: Types.ObjectId;
  country: string;
  created_at: Date;
  updated_at: Date;
  "state-province": string | null;
  domains: Array<string>;
  name: string;
  web_pages: Array<string>;
}
export interface IUniversityResult {
  universities: {
    results: IUniversity[] | [];
    total: Array<{ totalCount: number }> | [];
  } | null;
  error: unknown | null;
}

