import { IUniversity } from '@/helpers/types';
import { Btn } from '@/styles/common';
import { Form, Formik, FieldArray, Field } from 'formik';
import { useEffect, useState } from 'react';
import { FormArray, FormInput } from './Form';

type IUniForm = Pick<IUniversity, 'name' | 'country' | 'domains' | 'web_pages'>;
type UniFormProps = {
  data?: IUniversity | undefined;
  isEdit?: boolean;
};

export const UniForm = ({ data, isEdit = false }: UniFormProps) => {
  console.log(data);
  const initialValues: IUniForm = {
    name: '',
    country: '',
    domains: [''],
    web_pages: [''],
  };
  const [formValues, setFormValues] = useState<IUniForm>(null);
  useEffect(() => {
    if (isEdit && typeof data !== undefined) {
      setFormValues(data);
    }
  }, [isEdit, data]);
  const handleSubmit = (values) => {
    console.log('hi there');
    console.log(values);
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={formValues || initialValues}
      onSubmit={handleSubmit}
    >
      <Form>
        <FormInput name="name" label="Name" placeholder="Slovika" type="text" />
        <FormInput
          name="country"
          label="Country"
          placeholder="Slovika"
          type="text"
        />
        <FormArray selectedKey="domains" label="Domains" name="domains" />
        <FormArray selectedKey="web_pages" label="Web Pages" name="web_pages" />
        <Btn type="submit">Submit</Btn>
      </Form>
    </Formik>
  );
};
