import { Card } from '@/components/Card';
import { FormSelect } from '@/components/Form';
import { axiosInstance } from '@/helpers/axios';
import { countryList } from '@/helpers/countrylist';
import { IUniversity } from '@/helpers/types';
import { Btn, H2 } from '@/styles/common';
import { Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Home() {
  const filteredCountryList = countryList.map((country) => country.name);
  const [universities, setUniversities] = useState<IUniversity[] | []>([]);
  const [country, setCountry] = useState('Singapore');
  const fetchCountries = async (country: string) => {
    console.log(country);
    const results: IUniversity[] = (
      await axiosInstance.get(`/search?country=${country}`)
    ).data;
    const names = results.map((result) => result.name);
    const newResults = results.filter((result, index) =>
      names.includes(result.name, index + 1),
    );
    setUniversities(newResults);
  };
  useEffect(() => {
    fetchCountries(country);
  }, [country]);
  const handleSubmit = async (values) => {
    setCountry(values.country);
    return 'something';
  };
  return (
    <$Container>
      <$Heading>
        <$HeadingText>Universities</$HeadingText>
        <p>Search Bar</p>
      </$Heading>
      <$Body>
        <Formik initialValues={{ country }} onSubmit={handleSubmit}>
          <Form>
            <FormSelect
              name="country"
              label="Country"
              values={filteredCountryList}
            />
            <$Button type="submit">Go</$Button>
          </Form>
        </Formik>
        <div>
          {universities === [] ? (
            <p>There is nothing</p>
          ) : (
            universities.map((uni, index: number) => {
              return <Card key={index} name={uni.name} domains={uni.domains} />;
            })
          )}
        </div>
      </$Body>
    </$Container>
  );
}
const $Container = styled.div`
  margin-inline: 2rem;
`;
const $Heading = styled.div`
  border-bottom: 1px solid black;
`;
const $HeadingText = styled(H2)``;
const $Body = styled.div`
  display: grid;
  grid-template-columns: 10% 90%;
  grid-gap: 3.5rem;
`;
const $Button = styled(Btn)``;
