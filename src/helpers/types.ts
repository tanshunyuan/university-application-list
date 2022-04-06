export interface IUniversity {
  alpha_two_code: string;
  country: string;
  'state-province': string | null;
  domains: Array<string>;
  name: string;
  web_pages: Array<string>;
}
