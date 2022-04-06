import { Field } from 'formik';
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
      <Field component="select" id="location" name={name}>
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
