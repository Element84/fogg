import React from 'react';
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

  return (
    <ModFormContext.Provider
      value={{
        isFormEditable,
        setIsFormEditable,
        isAllFieldsEditable,
        shouldSaveForm
      }}
    >
      <div className="mod-form">
        <Form {...props} />
        <div className="mod-form-buttons">
          {!isFormEditable && (
            <Button onClick={handleEditClick} className="edit">
              Edit
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
