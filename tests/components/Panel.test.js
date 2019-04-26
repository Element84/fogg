import React from 'react';
import { shallow } from 'enzyme';

import Panel from 'components/Panel';

describe('Panel', () => {
  describe('Render', () => {
    const bodyClass = 'test';
    const bodyText = 'Chookity';
    const header = 'Mooncake';
    const body = <p className={bodyClass}>{bodyText}</p>;

    it('should render a Panel with a paragraph body and header', () => {
      const panel = shallow(<Panel header={header}>{body}</Panel>);

      expect(panel.find('.panel-header').text()).toEqual(header);
      expect(panel.find(`.${bodyClass}`).text()).toEqual(bodyText);
    });

    it('should render a Panel with a paragraph body only', () => {
      const panel = shallow(<Panel>{body}</Panel>);

      expect(panel.find('.panel-header').exists()).toEqual(false);
      expect(panel.find(`.${bodyClass}`).text()).toEqual(bodyText);
    });

    it('should render a Panel with a header only', () => {
      const panel = shallow(<Panel header={header} />);

      expect(panel.find('.panel-header').text()).toEqual(header);
      expect(panel.find('.panel-body').exists()).toEqual(false);
    });
  });
});
