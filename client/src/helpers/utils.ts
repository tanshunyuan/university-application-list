import { axiosInstance } from './axios';
import { IApi, IUniversity } from './types';

export const isString = (value: any) => {
  return typeof value === 'string';
};

export const isNumber = (value: any) => {
  return typeof value === 'number';
};

interface IFetchCountries {
  country: string;
  limit: string;
  page: string;
  search: string;
  setUniversities: (data: IUniversity[]) => void;
  setTotalPages: (totalPages: number) => void;
  stopLoading: () => void;
}

export const fetchCountries = async ({
  country,
  limit,
  page,
  search,
  setUniversities,
  setTotalPages,
  stopLoading,
}: IFetchCountries) => {
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
  setUniversities(universitiesData);
  setTotalPages(totalPages);
  stopLoading();
};

interface IFetchFeaturedUniversities {
  country: string;
  setFeaturedUniversities: (data: IUniversity[]) => void;
  stopLoading: () => void;
}

export const fetchFeaturedUniversities = async ({
  country,
  setFeaturedUniversities,
  stopLoading,
}: IFetchFeaturedUniversities) => {
  const url = `?country=${country}&limit=3`;
  const results: IApi = (await axiosInstance.get(url)).data;
  const universitiesData = results.data;
  console.log('universities data featured ==> ', universitiesData);
  setFeaturedUniversities(universitiesData);
  stopLoading();
};
