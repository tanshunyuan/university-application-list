import { axiosInstance } from './axios';
import { IApi} from './types';

export const isString = (value: any) => {
  return typeof value === 'string';
};

export const isNumber = (value: any) => {
  return typeof value === 'number';
};

interface IFetchUniversities {
  country: string;
  limit: string;
  page: string;
  search: string;
}

export const fetchUniversities = async ({
  country,
  limit,
  page,
  search,
}: IFetchUniversities) => {
  console.log('fetching country called?')
  const url = `?country=${country}&limit=${limit}&page=${page}`;
  const results: IApi = (await axiosInstance.get(url)).data;
  let universitiesData = results.data;
  if (search !== '') {
    universitiesData = universitiesData.filter(({ name }) => {
      const lName = name.toLowerCase();
      const queryName = search.toLowerCase().trim();
      return lName.includes(queryName);
    });
  }
  const totalPages = Math.ceil(results.total / Number(limit));
  return { universities: universitiesData, totalPages };
};

interface IFetchFeaturedUniversities {
  country: string;
}

export const fetchFeaturedUniversities = async ({
  country,
}: IFetchFeaturedUniversities) => {
  const url = `?country=${country}&limit=3`;
  const results: IApi = (await axiosInstance.get(url)).data;
  const universitiesData = results.data;
  return { featuredUniversities: universitiesData };
};
