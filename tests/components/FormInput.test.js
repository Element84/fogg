import React from 'react';
import { shallow, mount } from 'enzyme';
import sinon from 'sinon';

import { FormInput } from '../../';

describe('FormInput', () => {
  const selectOptions = [
    {
      label: 'Futurama',
      value: 'futurama'
    },
    {
      label: 'Rick & Morty',
      value: 'rick-morty'
    },
    {
      label: 'Final Space',
      value: 'final-space'
    }
  ];

  describe('Render', () => {
    const label = 'Name';
    const id = 'name-test-id';
    const input = shallow(<FormInput id={id} label={label} />);

    const inputRendered = input
      .find('Input')
      .dive()
      .find('input')
      .render();

    it('should render a label', () => {
      expect(input.find('label').text()).toEqual(label);
    });

    it('should should use ID as name if not provided', () => {
      expect(inputRendered.attr('name')).toEqual(id);
    });
  });

  describe('Events', () => {
    describe('Text', () => {
      const changeTestValue = 'Rick';
      const inputTestValue = 'Morty';

      let changeTest = null;
      let inputTest = null;

      function handleChange (event) {
        changeTest = event.target.value;
      }

      function handleInput (event) {
        inputTest = event.target.value;
      }

      const input = shallow(
        <FormInput
          id="name"
          label="Name"
          onChange={handleChange}
          onInput={handleInput}
        />
      )
        .find('Input')
        .dive()
        .find('input');

      it('should fire the change handler', () => {
        input.simulate('change', {
          target: {
            value: changeTestValue
          }
        });
        expect(changeTest).toEqual(changeTestValue);
      });

      it('should fire the input handler', () => {
        input.simulate('input', {
          target: {
            value: inputTestValue
          }
        });
        expect(inputTest).toEqual(inputTestValue);
      });
    });

    describe('Textarea', () => {
      const changeTestValue =
        'Really?! You&apos;ll have all the Slurm you can drink when you&apos;re partying with Slurms McKenzie!';
      const inputTestValue =
        'Whoa a real live robot; or is that some kind of cheesy New Year&apos;s costume?';

      let changeTest = null;
      let inputTest = null;

      function handleChange (event) {
        changeTest = event.target.value;
      }

      function handleInput (event) {
        inputTest = event.target.value;
      }

      const input = shallow(
        <FormInput
          id="comments"
          type="textarea"
          onChange={handleChange}
          onInput={handleInput}
        />
      )
        .find('Textarea')
        .dive()
        .find('textarea');

      it('should fire the change handler', () => {
        input.find('textarea').simulate('change', {
          target: {
            value: changeTestValue
          }
        });
        expect(changeTest).toEqual(changeTestValue);
      });

      it('should fire the input handler', () => {
        input.find('textarea').simulate('input', {
          target: {
            value: inputTestValue
          }
        });
        expect(inputTest).toEqual(inputTestValue);
      });
    });

    describe('Select', () => {
      let changeTest = null;
      let inputTest = null;

      function handleChange (event) {
        changeTest = event.target.value;
      }

      function handleInput (event) {
        inputTest = event.target.value;
      }

      const input = shallow(
        <FormInput
          id="organization"
          type="select"
          options={selectOptions}
          onChange={handleChange}
          onInput={handleInput}
        />
      )
        .find('Select')
        .dive()
        .find('select');

      it('should fire the change handler', () => {
        input.find('select').simulate('change', {
          target: {
            value: selectOptions[0].value
          }
        });
        expect(changeTest).toEqual(selectOptions[0].value);
      });

      it('should fire the input handler', () => {
        input.find('select').simulate('input', {
          target: {
            value: selectOptions[1].value
          }
        });
        expect(inputTest).toEqual(selectOptions[1].value);
      });
    });

    describe('Datetime', () => {
      const input = mount(<FormInput id="datetime" type="datetime" />);

      it('should display datepicker on focus', () => {
        input.find('input').simulate('focus');
        expect(input.find('.rdtOpen').exists()).toEqual(true);
      });

      it('should display datepicker on click', () => {
        input.find('input').simulate('click');
        expect(input.find('.rdtOpen').exists()).toEqual(true);
      });

      it('should display datepicker on clicking icon', () => {
        input.find('svg').simulate('click');
        expect(input.find('.rdtOpen').exists()).toEqual(true);
      });
    });
  });

  describe('Invalid Events', () => {
    let consoleStub = sinon.stub(console, 'error');

    describe('Text', () => {
      const input = shallow(
        <FormInput id="name" label="Name" onChange={'test'} onInput={'test'} />
      );

      it('should not throw an error when trying to fire the change handler', () => {
        expect(input.simulate('change')).toEqual({});
      });

      it('should not throw an error when trying to fire the input handler', () => {
        expect(input.simulate('input')).toEqual({});
      });

      expect(consoleStub.callCount).toEqual(2);
      expect(
        consoleStub.calledWithMatch('Warning: Failed prop type: Invalid prop')
      ).toEqual(true);
    });

    describe('Textarea', () => {
      const input = shallow(
        <FormInput
          id="comments"
          type="textarea"
          onChange={'test'}
          onInput={'test'}
        />
      );

      it('should not throw an error when trying to fire the change handler', () => {
        expect(input.simulate('change')).toEqual({});
      });

      it('should not throw an error when trying to fire the input handler', () => {
        expect(input.simulate('input')).toEqual({});
      });

      expect(consoleStub.callCount).toEqual(2);
      expect(
        consoleStub.calledWithMatch('Warning: Failed prop type: Invalid prop')
      ).toEqual(true);
    });

    describe('Select', () => {
      const input = shallow(
        <FormInput
          id="organization"
          type="select"
          options={selectOptions}
          onChange={'test'}
          onInput={'test'}
        />
      );

      it('should not throw an error when trying to fire the change handler', () => {
        expect(input.simulate('change')).toEqual({});
      });

      it('should not throw an error when trying to fire the input handler', () => {
        expect(input.simulate('input')).toEqual({});
      });

      expect(consoleStub.callCount).toEqual(2);
      expect(
        consoleStub.calledWithMatch('Warning: Failed prop type: Invalid prop')
      ).toEqual(true);
    });
    describe('Datetime', () => {
      const input = shallow(<FormInput id="datetime" type="datetime" />);

      it('should not throw an error when trying to fire the change handler', () => {
        expect(input.simulate('change')).toEqual({});
      });

      it('should not throw an error when trying to fire the input handler', () => {
        expect(input.simulate('input')).toEqual({});
      });

      expect(consoleStub.callCount).toEqual(2);
      expect(
        consoleStub.calledWithMatch('Warning: Failed prop type: Invalid prop')
      ).toEqual(true);
    });

    console.error.restore();
  });
});
