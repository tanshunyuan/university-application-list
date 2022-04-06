import { Field, FieldArray } from 'formik';
import styled from 'styled-components';
interface IFormInput {
  name: string;
  label?: string;
  type: string;
  placeholder: string;
}

export const FormInput = ({ placeholder, type, name, label }: IFormInput) => {
  return (
    <div>
      {label && <label htmlFor={name}>{label}</label>}
      <Field name={name} type={type} placeholder={placeholder} as="input" />
    </div>
  );
};

interface IFormSelect {
  name: string;
  label: string;
  values: Array<string>;
}
export const FormSelect = ({ values, name, label }: IFormSelect) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} as={$Select}>
        {values.map((value, index) => {
          return (
            <option value={value} key={index}>
              {value}
            </option>
          );
        })}
      </Field>
    </div>
  );
};

interface IFormArray {
  selectedKey: string;
  label: string;
  name: string;
}
export const FormArray = ({ selectedKey, label, name }: IFormArray) => {
  return (
    <FieldArray name={name}>
      {({ push, remove, form }) => {
        const { values: formValues } = form;
        const value = formValues[selectedKey];
        return (
          <div>
            <label htmlFor={name}>{label}</label>
            {value.map((_: string, index: number) => {
              return (
                <div key={index}>
                  <Field
                    name={`${name}[${index}]`}
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
  );
};

const $Select = styled.select`
  width: 100%;
`;
