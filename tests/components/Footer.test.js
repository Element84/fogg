import React from 'react';
import { render } from 'enzyme';

import { Footer } from '../../';

describe('Footer', () => {
  it('renders', () => {
    const footer = render(<Footer />);
    expect(footer.find('p').text()).toEqual('This is the footer for now');
  });
});
