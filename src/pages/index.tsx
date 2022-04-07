import { Universities } from '@/components/Universities';
import { FormInput, FormSelect } from '@/components/Form';
import { Spinner } from '@/components/Spinner';
import { axiosInstance } from '@/helpers/axios';
import { countryList } from '@/helpers/countrylist';
import {
  IApi,
  IHomeFormValue,
  IHomeParams,
  IUniversity,
} from '@/helpers/types';
import { Btn, BtnSm, H2 } from '@/styles/common';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

export default function Home() {
  const router = useRouter();
  const { isReady, pathname } = router;
  const query = router.query as IHomeParams;
  const {
    search: qSearch = '',
    country: qCountry = '',
    limit: qLimit = '3',
    page: qPage = '1',
  } = query;

  const [isLoading, setIsLoading] = useState(true);
  const [universities, setUniversities] = useState<IUniversity[] | []>([]);
  const [country, setCountry] = useState('Singapore');
  const [totalPages, setTotalPages] = useState(0);
  const filteredCountryList = countryList.map((country) => country.name);
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  const initialValues: IHomeFormValue = {
    country: qCountry || country,
    search: qSearch,
    limit: qLimit,
  };

  const fetchCountries = async () => {
    const url = `?country=${country}&limit=${qLimit}&page=${qPage}`;
    const results: IApi = (await axiosInstance.get(url)).data;
    let universitiesData = results.data;
    if (qSearch !== '') {
      universitiesData = universitiesData.filter(({ name }) => {
        const lName = name.toLowerCase();
        const queryName = qSearch.toLowerCase().trim();
        return lName.includes(queryName);
      });
    }
    setUniversities(universitiesData);
    setTotalPages(Math.ceil(results.total / Number(qLimit)));
    stopLoading();
  };

  const handleSubmit = async (values: { country: string }) => {
    setCountry(values.country);
    router.push({ query: { ...values }, pathname: '/' }, undefined, {
      shallow: true,
    });
  };

  const pagginationHandler = (page: { selected: number }) => {
    const currentPath = pathname;
    const currentQuery = query;
    currentQuery.page = (page.selected + 1).toString();
    router.push({
      pathname: currentPath,
      query: currentQuery,
    });
  };
  useEffect(() => {
    if (isReady && pathname === '/') {
      router.push(
        { query: { country, search: '', page: 1, limit: 3 } },
        undefined,
        {
          shallow: true,
        },
      );
    }
  }, [isReady, pathname]);

  useEffect(() => {
    if (isReady) {
      fetchCountries();
    }
  }, [country, qSearch, qLimit, qPage, isReady]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        <$Form>
          <$Nav>
            <Link href="/uni/create">
              <Btn>Create</Btn>
            </Link>
          </$Nav>
          <$Container>
            <$Heading>
              <H2>Universities</H2>
              <$SearchBar>
                <FormInput placeholder="Search" type="text" name="search" />
                <Btn type="submit">Go</Btn>
              </$SearchBar>
            </$Heading>
            <$Body>
              <$FormWrapper>
                <FormSelect
                  name="country"
                  label="Country"
                  options={filteredCountryList}
                  onChange={(e) => setCountry(e.target.value)}
                />
                <FormSelect
                  name="limit"
                  label="Limit"
                  options={['3', '4', '5']}
                  onChange={(e) => console.log('event', e)}
                />
                <BtnSm type="submit">Go</BtnSm>
              </$FormWrapper>
              <$UniversityList>
                <Universities country={country} universities={universities} />
              </$UniversityList>
            </$Body>
          </$Container>
          <$Pagination>
            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              activeClassName={'active'}
              containerClassName={'pagination'}
              initialPage={Number(qPage) - 1}
              pageCount={totalPages}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={pagginationHandler}
            />
          </$Pagination>
        </$Form>
      </Formik>
    </>
  );
}
const $Container = styled.div`
  margin-inline: 2rem;
`;
const $Heading = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 1.5rem;
  h2 {
    margin-bottom: 1.5rem;
  }
`;
const $Body = styled.div`
  display: grid;
  @media all and (min-width: 1280px) {
    grid-template-columns: 20% 80%;
  }
`;
const $FormWrapper = styled.div``;
const $Nav = styled.nav``;
const $Pagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: auto;
  margin-bottom: 2rem;
`;

const $UniversityList = styled.div`
  justify-self: center;
  max-width: 54rem;
  width: 100%;
  @media all and (min-width: 1280px) {
    margin-left: 3.5rem;
  }
`;
const $SearchBar = styled.div`
  margin-bottom: 2.5rem;
  width: 100%;
  display: inline-flex;
  gap: 2rem;
  div {
    flex-grow: 1;
  }
`;
const $Form = styled(Form)`
  display: flex;
  flex-direction: column;
  height: 100%;
`;
