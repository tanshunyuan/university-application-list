import { IUniversity } from '@/helpers/types';
import { Btn } from '@/styles/common';
import { Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import { FormInput } from './Form';
interface IUniForm {
  country: string;
  domain: string;
  webpage: string;
}
export const UniForm = ({
  data = [],
  isEdit = false,
}: {
  data?: IUniversity | [];
  isEdit?: boolean;
}) => {
  const [initialValues, setInitialValues] = useState({});
  useEffect(() => {
    const meme: IUniForm = {
      country: '',
      domain: '',
      webpage: '',
    };
    setInitialValues(meme);
    if (isEdit && data !== []) {
      setInitialValues(data);
    }
  }, [isEdit, data]);
  const handleSubmit = () => {
    console.log('hi there');
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <Form>
        {JSON.stringify(initialValues)}
        <FormInput
          name="country"
          label="Country"
          placeholder="Slovika"
          type="text"
        />
        <FormInput
          name="domain"
          label="Domain"
          placeholder="google.com.sg"
          type="text"
        />
        <FormInput
          name="webpage"
          label="Webpage"
          placeholder="https://google.com.sg/"
          type="text"
        />
        <Btn type="submit">Submit</Btn>
      </Form>
    </Formik>
  );
};
