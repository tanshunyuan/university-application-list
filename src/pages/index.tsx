import { Card } from '@/components/Card';
import { FormSelect } from '@/components/Form';
import { axiosInstance } from '@/helpers/axios';
import { countryList } from '@/helpers/countrylist';
import { IUniversity } from '@/helpers/types';
import { Btn } from '@/styles/common';
import { Formik, Form } from 'formik';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export default function Home() {
  const filteredCountryList = countryList.map((country) => country.name);
  const [universities, setUniversities] = useState<IUniversity[] | []>([]);
  const [country, setCountry] = useState('Singapore');
  const fetchCountries = async (country: string) => {
    const result = (await axiosInstance.get(`/search?country=${country}`)).data;
    setUniversities(result);
  };
  useEffect(() => {
    fetchCountries(country);
  }, [country]);
  const handleSubmit = async (values) => {
    setCountry(values.country);
    return 'something';
  };
  return (
    <div>
      {universities === [] ? (
        <p>There is nothing</p>
      ) : (
        universities.map((uni, index: number) => {
          return <Card key={index} name={uni.name} domain={uni.domains} />;
        })
      )}
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
    </div>
  );
}

const $Button = styled(Btn)``;
