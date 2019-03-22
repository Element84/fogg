import React from 'react';
// import { shallow } from 'enzyme';
import ReactDOM from 'react-dom';

import Button from 'components/Button';

// const button = (
//   <Button text="Button No Link" active={true} />
// )

// const linkedButton = (
//   <Button to="/" text="Button With Link" />
// )

// const activeButton = (
//   <Button text="Button No Link" active={true} />
// )

// const disabledButton = (
//   <Button text="Button No Link" active={true} />
// )

// describe('Render', () => {
//   const text = 'Name'
//   const active = true
//   const button = shallow(<Button text={text} active={true} />)
//   it('should render a button', () => {
//     expect(button.find('text').text()).toEqual(text)
//   })
// })

// describe('Render', () => {
//   const label = 'Name';
//   const id = 'name-test-id';
//   const input = shallow(<FormInput id={id} label={label} />);
//   const inputRendered = input.find('input').render();

//   it('should render a label', () => {
//     expect(input.find('label').text()).toEqual(label);
//   });

// next

// describe('Class name', () => {
//   const buttonClass = 'test-class'
//   const button = shallow(<Button className={buttonClass} />)

//   it('should render the correct class name', () => {
//     expect(button.hasClass(buttonClass)).toEqual(true)
//   })
// })

//   it('should should use ID as name if not provided', () => {
//     expect(inputRendered.attr('name')).toEqual(id);
//   });
// });

describe('Button renders', () => {
  it('renders', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
