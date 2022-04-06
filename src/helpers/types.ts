export interface IUniversity {
  id: string;
  alpha_two_code: string;
  country: string;
  created_at: Date;
  updated_at: Date;
  'state-province': string | null;
  domains: Array<string>;
  name: string;
  web_pages: Array<string>;
}

export interface IApi {
  current_page: string;
  data: IUniversity[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: IApiLink[];
  next_page_url: string;
  path: string;
  per_page: string;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export interface IApiLink {
  url: string | null;
  label: string;
  active: boolean;
}
