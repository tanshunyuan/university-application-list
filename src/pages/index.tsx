import { Card } from '@/components/Card';
import { FormInput, FormSelect } from '@/components/Form';
import { Spinner } from '@/components/Spinner';
import { axiosInstance } from '@/helpers/axios';
import { countryList } from '@/helpers/countrylist';
import { IUniversity } from '@/helpers/types';
import { Btn, H2 } from '@/styles/common';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Home() {
  const router = useRouter();

  const filteredCountryList = countryList.map((country) => country.name);
  const [loading, setLoading] = useState(true);
  const [universities, setUniversities] = useState<IUniversity[] | []>([]);
  const [country, setCountry] = useState('Singapore');

  const fetchCountries = async (country: string) => {
    if (router.query != null) {
      const url = `/search?country=${country}&name=${router.query.search}`;
      const results: IUniversity[] = (await axiosInstance.get(url)).data;
      const names = results.map((result) => result.name);
      const newResults = results.filter((result, index) =>
        names.includes(result.name, index + 1),
      );
      console.log(results);
      console.log(newResults);
      if (router.query.search !== '') {
        setUniversities(results);
      } else {
        setUniversities(results);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (router.isReady) {
      fetchCountries(country);
    }
  }, [country, router.query.search]);

  const handleSubmit = async (values: { country: string }) => {
    console.log(values);
    setCountry(values.country);
    router.push({ query: { ...values }, pathname: '/' }, undefined, {
      shallow: true,
    });

    return 'something';
  };

  if (loading) return <Spinner />;
  return (
    <>
      <Formik
        initialValues={{
          country: router.query.country || country,
          search: router.query.search || '',
        }}
        onSubmit={handleSubmit}
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
                <$Button type="submit">Go</$Button>
              </$FormWrapper>
              <$UniversityList>
                <H2>{country}</H2>
                {universities.length == 0 ? (
                  <p>There is nothing</p>
                ) : (
                  universities.map((uni, index: number) => {
                    return <Card key={index} name={uni.name} />;
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
  grid-template-columns: 20% 80%;
`;
const $FormWrapper = styled.div``;
const $UniversityList = styled.div`
  margin-left: 3.5rem;
  justify-self: center;
  max-width: 54rem;
  width: 100%;
`;
const $Button = styled(Btn)``;
const $Nav = styled.nav``;
