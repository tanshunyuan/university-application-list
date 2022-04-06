import { IUniversity } from '@/helpers/types';
import { Btn } from '@/styles/common';
import { Form, Formik, FieldArray, Field } from 'formik';
import { useEffect, useState } from 'react';
import { FormInput } from './Form';

type IUniForm = Pick<IUniversity, 'country' | 'domains' | 'web_pages'>;
type UniFormProps = {
  data?: IUniversity | undefined;
  isEdit?: boolean;
};

export const UniForm = ({ data, isEdit = false }: UniFormProps) => {
  console.log(data);
  const initialValues: IUniForm = {
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
        <FormInput
          name="country"
          label="Country"
          placeholder="Slovika"
          type="text"
        />
        <FieldArray name="domains">
          {({ push, remove, form }) => {
            const {
              values: { domains },
            } = form;
            return (
              <div>
                <label htmlFor="domains">Domains</label>
                {domains.map((_: string, index: number) => {
                  return (
                    <div key={index}>
                      <Field
                        name={`domains[${index}]`}
                        placeholder="google.com"
                        type="text"
                      />
                      <button onClick={() => push('')}>+</button>
                      {index > 0 && (
                        <button onClick={() => remove(index)}>-</button>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          }}
        </FieldArray>
        <FieldArray name="web_pages">
          {({ push, remove, form }) => {
            const {
              values: { web_pages },
            } = form;
            return (
              <div>
                <label htmlFor="web_pages">Web Pages</label>
                {web_pages.map((_: string, index: number) => {
                  return (
                    <div key={index}>
                      <Field
                        name={`web_pages[${index}]`}
                        placeholder="https://google.com"
                        type="text"
                      />
                      <button onClick={() => push('')}>+</button>
                      {index > 0 && (
                        <button onClick={() => remove(index)}>-</button>
                      )}
                    </div>
                  );
                })}
              </div>
            );
          }}
        </FieldArray>
        <Btn type="submit">Submit</Btn>
      </Form>
    </Formik>
  );
};
