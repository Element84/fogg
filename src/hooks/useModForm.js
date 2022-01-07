import { useState } from 'react';

const useModForm = () => {
  const [fields, setFields] = useState({});
  const [editableFields, setEditableFields] = useState(new Set());
  const [isFormEditable, setIsFormEditable] = useState(false);
  const [isAllFieldsEditable, setIsAllFieldsEditable] = useState(false);
  const [shouldSaveForm, setShouldSaveForm] = useState(false);

  /**
   * updateField
   * @description Updates the isChangeable prop for each field
   */

  function updateField (name, isChangeable) {
    setFields((fields) => {
      let fieldAttributes = fields[name] || {};

      fieldAttributes = Object.assign({}, fieldAttributes, {
        isChangeable
      });

      return {
        ...fields,
        [name]: fieldAttributes
      };
    });
  }

  /**
   * updateFormEditable
   * @description sets isFormEditable based on isChangeable of all fields
   */

  function updateFormEditable () {
    for (const [field, properties] of Object.entries(fields)) {
      // we want to add fields that have isChangeable set to true
      // to our set of fields that are editable
      if (properties.isChangeable) {
        editableFields.add(field);
        setEditableFields(editableFields);
      } else {
        editableFields.delete(field);
        setEditableFields(editableFields);
      }
    }

    if (editableFields.size > 0) {
      // if we have editable fields, the form as a whole is editable
      setIsFormEditable(true);
      if (editableFields.size === Object.keys(fields).length) {
        // if the number of editable fields == number of fields we have,
        // then all fields in the form are editable
        setIsAllFieldsEditable(true);
      } else {
        setIsAllFieldsEditable(false);
      }
    } else {
      setIsFormEditable(false);
    }
  }

  return {
    fields,
    updateField,
    updateFormEditable,
    isFormEditable,
    setIsFormEditable,
    isAllFieldsEditable,
    setIsAllFieldsEditable,
    shouldSaveForm,
    setShouldSaveForm
  };
};

export default useModForm;
