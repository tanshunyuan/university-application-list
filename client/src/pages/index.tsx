import { Formik, Form } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import styled from 'styled-components';

import { IHomeFormValue, IHomeParams, IUniversity } from '@/helpers/types';
import { Universities } from '@/components/Universities';
import { FormInput, FormSelect } from '@/components/Form';
import { Spinner } from '@/components/Spinner';
import { countryList } from '@/helpers/countrylist';
import { Btn, BtnSm, H2 } from '@/styles/common';
import { FeaturedCard } from '@/components/FeaturedCard';
import { fetchCountries, fetchFeaturedUniversities } from '@/helpers/utils';

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
  const [featuredUniversities, setFeaturedUniversities] = useState<
    IUniversity[] | []
  >([]);
  const [totalPages, setTotalPages] = useState(0);
  const filteredCountryList = countryList.map((country) => country.name);
  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  const initialValues: IHomeFormValue = {
    country: qCountry,
    search: qSearch,
    limit: qLimit,
  };

  const handleSubmit = async (values: { country: string }) => {
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
    if (isReady) {
      fetchCountries({
        country: qCountry,
        search: qSearch,
        limit: qLimit,
        page: qPage,
        setTotalPages,
        setUniversities,
        stopLoading,
      });
      // fetchFeaturedUniversities({
      //   country: qCountry,
      //   setFeaturedUniversities,
      //   stopLoading,
      // });
    }
  }, [qCountry, qSearch, qLimit, qPage, isReady]);

  if (isLoading) return <Spinner />;

  return (
    <>
      <$Banner>
        <$Nav>
          <Link href="/uni/create" passHref>
            <$CreateBtn>Create</$CreateBtn>
          </Link>
        </$Nav>
        <$BannerContent>
          {featuredUniversities.map((uni, index) => {
            return (
              <FeaturedCard
                key={index}
                name={uni.name}
                id={uni.id}
                country={uni.country}
              ></FeaturedCard>
            );
          })}
        </$BannerContent>
      </$Banner>

      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        <$Form>
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
                />
                <FormSelect
                  name="limit"
                  label="Limit"
                  options={['3', '4', '5']}
                />
                <BtnSm type="submit">Go</BtnSm>
              </$FormWrapper>
              <$UniversityList>
                <Universities country={qCountry} universities={universities} />
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
const $Banner = styled.div`
  height: min-content;
  background-color: black;
  margin-bottom: 2.5rem;
  padding-inline: 2rem;
  @media all and (min-width: 1280px) {
    height: 20%;
  }
`;
const $BannerContent = styled.div`
  display: grid;
  grid-gap: 1rem;
  color: white;
  @media all and (min-width: 1280px) {
    grid-template-columns: repeat(3, 1fr);
  }
`;
const $Nav = styled.nav`
  padding-top: 1rem;
  margin-bottom: 1rem;
`;
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
const $FormWrapper = styled.div`
  div {
    margin-bottom: 1rem;
  }
`;
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
const $CreateBtn = styled(Btn)`
  color: white;
  border: 1px solid white;
  &:hover {
    color: black;
    background-color: white;
  }
`;
