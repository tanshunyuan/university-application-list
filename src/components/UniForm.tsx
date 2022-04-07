import { IUniversity } from '@/helpers/types';
import { Btn } from '@/styles/common';
import { ErrorMessage, Form, Formik, FormikHelpers } from 'formik';
import { useEffect, useState } from 'react';
import { FormArray, FormInput } from './Form';
import * as Yup from 'yup';
import styled from 'styled-components';

type IUniForm = Pick<IUniversity, 'name' | 'country' | 'domains' | 'web_pages'>;
type UniFormProps = {
  data?: IUniversity | undefined;
  isEdit?: boolean;
};

const UniFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(5, 'Too Short')
    .max(50, 'Too Long!')
    .required('Required'),
  country: Yup.string()
    .min(5, 'Too Short')
    .max(50, 'Too Long!')
    .required('Required'),
  domains: Yup.array().of(Yup.string().required('Required')).min(1),
  web_pages: Yup.array().of(Yup.string().required('Required')).min(1),
});

export const UniForm = ({ data, isEdit = false }: UniFormProps) => {
  const initialValues: IUniForm = {
    name: '',
    country: '',
    domains: [''],
    web_pages: [''],
  };
  const [formValues, setFormValues] = useState<IUniForm>(initialValues);
  useEffect(() => {
    if (isEdit && data !== undefined) {
      setFormValues(data);
    }
  }, [isEdit, data]);
  const handleSubmit = (values: IUniForm, helpers: FormikHelpers<IUniForm>) => {
    console.log('hi there');
  };
  return (
    <Formik
      enableReinitialize={true}
      initialValues={formValues || initialValues}
      onSubmit={handleSubmit}
      validationSchema={UniFormSchema}
    >
      {({ errors, touched }) => (
        <Form>
          <FormInput
            name="name"
            label="Name"
            placeholder="Slovika"
            type="text"
          />
          {errors.name && touched.name ? (
            <$ErrorMessage>{errors.name}</$ErrorMessage>
          ) : null}

          <FormInput
            name="country"
            label="Country"
            placeholder="Slovika"
            type="text"
          />
          {errors.country && touched.country ? (
            <$ErrorMessage>{errors.country}</$ErrorMessage>
          ) : null}

          <FormArray selectedKey="domains" label="Domains" name="domains" />
          {typeof errors.domains === 'object' ? (
            <$ErrorMessage>{errors.domains}</$ErrorMessage>
          ) : null}
          <FormArray
            selectedKey="web_pages"
            label="Web Pages"
            name="web_pages"
          />
          {typeof errors.web_pages === 'object' ? (
            <$ErrorMessage>{errors.web_pages}</$ErrorMessage>
          ) : null}
          <Btn type="submit">Submit</Btn>
        </Form>
      )}
    </Formik>
  );
};

const $ErrorMessage = styled.div`
  color: red;
  font-size: ${(props) => props.theme.small}px;
`;
