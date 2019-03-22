import React from 'react';
import PropTypes from 'prop-types';
import { action } from '@storybook/addon-actions';

import Form from '../../components/Form';

/**
 * BaseForm
 * @description Component used for scaffolding form-based stories
 */

const BaseForm = ({ children }) => {
  function handleSubmit (event) {
    event.persist();
    event.preventDefault();
    action('form-submit')(event);
  }

  function handleChange (event) {
    event.persist();
    action('form-change')(event);
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
