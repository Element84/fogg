import React from 'react';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Form from 'components/Form';

describe('WonderLink', () => {
  const inputs = (
    <div>
      <input id="test-1" name="test-1" type="text" />
      <input id="test-2" name="test-2" type="text" />
    </div>
  );

  describe('Text', () => {
    const formClass = 'test-class';
    const form = shallow(<Form className={formClass}>Chookity!</Form>);

    it('should render the given text', () => {
      expect(form.text()).toEqual('Chookity!');
    });

    it('should render the given text', () => {
      expect(form.hasClass(formClass)).toEqual(true);
    });
  });

  describe('Inputs', () => {
    const form = shallow(<Form>{inputs}</Form>);

    it('should render the given inputs', () => {
      expect(form.contains(inputs)).toEqual(true);
    });
  });

  describe('Events', () => {
    let submitTest = 1;
    let changeTest = 1;
    let inputTest = 1;

    function handleSubmit () {
      submitTest++;
    }

    function handleChange (event) {
      changeTest++;
    }

    function handleInput (event) {
      inputTest++;
    }

    const form = shallow(
      <Form
        onSubmit={handleSubmit}
        onChange={handleChange}
        onInput={handleInput}
      >
        {inputs}
      </Form>
    );

    it('should fire the submit handler', () => {
      form.simulate('submit');
      expect(submitTest).toEqual(2);
    });

    it('should fire the change handler', () => {
      form.simulate('change');
      expect(changeTest).toEqual(2);
    });

    it('should fire the input handler', () => {
      form.simulate('input');
      expect(inputTest).toEqual(2);
    });
  });

  describe('Invalid Events', () => {
    let consoleStub = sinon.stub(console, 'error');
    const form = shallow(
      <Form onSubmit={'test'} onChange={'test'} onInput={'test'}>
        {inputs}
      </Form>
    );

    it('should not throw an error when trying to fire the submit handler', () => {
      expect(form.simulate('submit')).toEqual({});
    });

    it('should not throw an error when trying to fire the change handler', () => {
      expect(form.simulate('change')).toEqual({});
    });

    it('should not throw an error when trying to fire the input handler', () => {
      expect(form.simulate('input')).toEqual({});
    });

    expect(consoleStub.callCount).toEqual(3);
    expect(
      consoleStub.calledWithMatch('Warning: Failed prop type: Invalid prop')
    ).toEqual(true);

    console.error.restore();
  });
});
