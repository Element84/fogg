import React from 'react';
import { render } from 'enzyme';
import ReactDOM from 'react-dom'

import Button from 'components/Button';

describe('Button', () => {
  it('renders', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Button />, div);
    ReactDOM.unmountComponentAtNode(div);
  })
})