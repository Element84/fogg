import React from 'react';
import { shallow } from 'enzyme';

import Layout from './';

describe('Layout', () => {
  describe('Render', () => {
    it('should render a Layout with the included content', () => {
      const text = 'I am some layout content';
      const content = <p>{text}</p>;
      const layout = shallow(<Layout>{content}</Layout>);
      expect(layout.find('p').text()).toEqual(text);
    });
  });

  describe('Notice', () => {
    it('should include a text string Notice', () => {
      const text = 'I am some layout content';
      const noticeText = 'I am not ice';
      const content = <p className="layout-content">{text}</p>;
      const layout = shallow(
        <Layout
          notice={{
            text: noticeText
          }}
        >
          {content}
        </Layout>
      );
      const layoutNotice = layout.find('LayoutNotice').dive();
      expect(layoutNotice.find('Notice').prop('children')).toEqual(noticeText);
    });
  });
});
