import { createContext } from 'react';

export const FormNoContext = {
  updateField: () => {},
  fields: {}
};

const FormContext = createContext();

export default FormContext;
