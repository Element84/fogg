import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Form from './';

describe('Form', () => {
  const inputs = (
    <div>
      <input id="test-1" name="test-1" type="text" />
      <input id="test-2" name="test-2" type="text" />
    </div>
  );

  const defaultFormEvent = {
    persist: () => {},
    preventDefault: () => {}
  };

  describe('Text', () => {
    const formClass = 'test-class';
    const form = shallow(<Form className={formClass}>Chookity!</Form>).find(
      'form'
    );

    it('should render the given text', () => {
      expect(form.text()).toEqual('Chookity!');
    });

    it('should render the given text', () => {
      expect(form.hasClass(formClass)).toEqual(true);
    });
  });

  describe('Inputs', () => {
    const form = shallow(<Form>{inputs}</Form>).find('form');

    it('should render the given inputs', () => {
      expect(form.contains(inputs)).toEqual(true);
    });
  });

  describe('Events', () => {
    let submitTest = 1;
    let changeTest = 1;

    function handleSubmit () {
      submitTest++;
    }

    function handleChange (event) {
      changeTest++;
    }

    const form = shallow(
      <Form onSubmit={handleSubmit} onChange={handleChange}>
        {inputs}
      </Form>
    ).find('form');

    it('should fire the submit handler', () => {
      form.simulate('submit', defaultFormEvent);
      expect(submitTest).toEqual(2);
    });

    it('should fire the change handler', () => {
      form.simulate('change', defaultFormEvent);
      expect(changeTest).toEqual(2);
    });
  });

  describe('Invalid Events', () => {
    const consoleStub = sinon.stub(console, 'error');
    const form = shallow(
      <Form onSubmit={'test'} onChange={'test'}>
        {inputs}
      </Form>
    ).find('form');

    it('should not throw an error when trying to fire the submit handler', () => {
      expect(form.simulate('submit', defaultFormEvent)).toEqual({});
    });

    it('should not throw an error when trying to fire the change handler', () => {
      expect(form.simulate('change', defaultFormEvent)).toEqual({});
    });

    expect(consoleStub.callCount).toEqual(2);
    /* TODO: Fix this test
    expect(
      consoleStub.calledWithMatch('Warning: Failed prop type: Invalid prop')
    ).toEqual(true);
    */
    console.error.restore();
  });
});
