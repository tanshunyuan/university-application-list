import { Card } from '@/components/Card';
import { FormInput, FormSelect } from '@/components/Form';
import { Spinner } from '@/components/Spinner';
import { axiosInstance } from '@/helpers/axios';
import { countryList } from '@/helpers/countrylist';
import { IApi, IUniversity } from '@/helpers/types';
import { Btn, H2 } from '@/styles/common';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

interface IFormValue {
  country: string;
  search: string;
  limit: string;
}

export default function Home() {
  const router = useRouter();
  const { isReady, query } = router;
  const { search: qSearch, country: qCountry, limit: qLimit } = query;
  const [loading, setLoading] = useState(true);
  const [universities, setUniversities] = useState<IUniversity[] | []>([]);
  const [country, setCountry] = useState('Singapore');
  const filteredCountryList = countryList.map((country) => country.name);

  const initialValues: IFormValue = {
    country: qCountry || country,
    search: qSearch || '',
    limit: qLimit || '',
  };

  useEffect(() => {
    if (isReady) {
      fetchCountries();
      console.log('change leh', country);
    }
  }, [country, qSearch, qLimit, isReady]);

  const fetchCountries = async () => {
    const url = `?country=${country}&limit=${qLimit}`;
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
    setLoading(false);
  };

  const handleSubmit = async (values: { country: string }) => {
    setCountry(values.country);
    router.push({ query: { ...values }, pathname: '/' }, undefined, {
      shallow: true,
    });
  };

  if (loading) return <Spinner />;
  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        <Form>
          <$Nav>
            <Link href="/uni/create">
              <$Button>Create</$Button>
            </Link>
          </$Nav>
          <$Container>
            <$Heading>
              <H2>Universities</H2>
              <FormInput
                label="Search"
                placeholder="Search"
                type="text"
                name="search"
              />
            </$Heading>
            <$Body>
              <$FormWrapper>
                <FormSelect
                  name="country"
                  label="Country"
                  values={filteredCountryList}
                />
                <FormSelect
                  name="limit"
                  label="Limit"
                  values={['3', '4', '5']}
                />
                <$Button type="submit">Go</$Button>
              </$FormWrapper>
              <$UniversityList>
                <H2>{country}</H2>
                {universities.length == 0 ? (
                  <p>There is nothing</p>
                ) : (
                  universities.map((uni, index: number) => {
                    return (
                      <Card
                        key={index}
                        name={uni.name}
                        id={uni.id}
                        country={uni.country}
                      />
                    );
                  })
                )}
              </$UniversityList>
            </$Body>
          </$Container>
        </Form>
      </Formik>
    </>
  );
}
const $Container = styled.div`
  margin-inline: 2rem;
`;
const $Heading = styled.div`
  border-bottom: 1px solid black;
`;
const $Body = styled.div`
  display: grid;
  @media all and (min-width: 1280px) {
    grid-template-columns: 20% 80%;
  }
`;
const $FormWrapper = styled.div``;
const $UniversityList = styled.div`
  justify-self: center;
  max-width: 54rem;
  width: 100%;
  @media all and (min-width: 1280px) {
    margin-left: 3.5rem;
  }
`;
const $Button = styled(Btn)``;
const $Nav = styled.nav``;
