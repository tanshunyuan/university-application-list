import { Field, FieldArray } from 'formik';
import React from 'react';
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
      <Field name={name} type={type} placeholder={placeholder} as={$Input} />
    </div>
  );
};

interface IFormSelect {
  name: string;
  label: string;
  options: Array<string>;
}
export const FormSelect = ({ options, name, label }: IFormSelect) => {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field id={name} name={name} as={$Select}>
        {options.map((option, index) => {
          return (
            <option value={option} key={index}>
              {option}
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
  placeholder: string;
}
export const FormArray = ({
  selectedKey,
  label,
  name,
  placeholder,
}: IFormArray) => {
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
                    placeholder={placeholder}
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
  padding: 0.25rem 0.5rem;
  border-radius: 0.5rem;
  outline: none;
`;
const $Input = styled.input`
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 0.5rem;
  outline: none;
  border: 1px solid black;
`;
