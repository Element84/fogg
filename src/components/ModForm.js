import React, { useEffect } from 'react';
import Form from './Form';
import Button from './Button';
import { useModForm } from '../hooks';
import { ModFormContext } from '../context';

/**
 * ModForm
 * @description Default form component
 */

const ModForm = props => {
  const {
    fields,
    updateField,
    updateFormEditable,
    isFormEditable,
    setIsFormEditable,
    isAllFieldsEditable,
    setIsAllFieldsEditable,
    shouldSaveForm,
    setShouldSaveForm
  } = useModForm();

  function handleEditClick () {
    setIsFormEditable(true);
    setIsAllFieldsEditable(true);
  }

  function handleSaveClick () {
    setIsFormEditable(false);
    setIsAllFieldsEditable(false);
    setShouldSaveForm(true);
  }

  function handleCancelClick () {
    setIsFormEditable(false);
    setIsAllFieldsEditable(false);
    setShouldSaveForm(false);
  }

  useEffect(() => {
    updateFormEditable();
  }, [fields]);

  return (
    <ModFormContext.Provider
      value={{
        updateField,
        isFormEditable,
        isAllFieldsEditable,
        shouldSaveForm
      }}
    >
      <div className="mod-form">
        <Form {...props} />
        <div className="mod-form-buttons">
          {!isAllFieldsEditable && (
            <Button onClick={handleEditClick} className="edit">
              {!isFormEditable ? 'Edit' : 'Edit All'}
            </Button>
          )}
          {isFormEditable && (
            <>
              <Button onClick={handleSaveClick} className="save">
                Save
              </Button>
              <Button onClick={handleCancelClick} className="cancel">
                Cancel
              </Button>
            </>
          )}
        </div>
      </div>
    </ModFormContext.Provider>
  );
};

export default ModForm;
