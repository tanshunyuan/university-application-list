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

interface IFormValue {
  country: string;
  search: string;
}

export default function Home() {
  const router = useRouter();
  const { isReady, query } = router;
  const { search: qSearch, country: qCountry } = query;
  const [loading, setLoading] = useState(true);
  const [universities, setUniversities] = useState<IUniversity[] | []>([]);
  const [country, setCountry] = useState('Singapore');
  const filteredCountryList = countryList.map((country) => country.name);

  const initialValues: IFormValue = {
    country: qCountry || country,
    search: qSearch || '',
  };

  useEffect(() => {
    if (isReady) {
      fetchCountries(country);
    }
  }, [country, qSearch, isReady]);

  const fetchCountries = async (country: string) => {
    const url = `/search?country=${country}&name=${qSearch || ''}`;
    const results: IUniversity[] = (await axiosInstance.get(url)).data;
    const names = results.map((result) => result.name);
    const newResults = results.filter((result, index) =>
      names.includes(result.name, index + 1),
    );
    console.log(url);
    if (qSearch !== '') {
      setUniversities(results);
    } else {
      setUniversities(newResults);
    }
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
