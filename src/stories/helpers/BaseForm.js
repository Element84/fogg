import React from 'react';
import PropTypes from 'prop-types';
import { action } from '@storybook/addon-actions';

import Form from '../../components/Form';

/**
 * BaseForm
 * @description Component used for scaffolding form-based stories
 */

const BaseForm = ({ children }) => {
  function handleSubmit (event, fields) {
    action('form-submit')(event, fields);
  }

  function handleChange (event, fields) {
    action('form-change')(event, fields);
  }

  return (
    <Form onSubmit={handleSubmit} onChange={handleChange}>
      {children}
      <button>Submit</button>
    </Form>
  );
};

BaseForm.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default BaseForm;
