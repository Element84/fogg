import React from 'react';
import { shallow } from 'enzyme';

import Notice from './';

describe('Notice', () => {
  describe('Render', () => {
    it('should pass props to wrapper component', () => {
      const props = {
        type: 'warning',
        align: 'center',
        weight: 'bold'
      };
      const text = 'Guess what? I am a notice';
      const notice = shallow(<Notice {...props}>{text}</Notice>);
      const noticeProps = { ...notice.find('NoticeWrapper').props() };
      delete noticeProps.children;
      expect(noticeProps).toEqual(props);
    });

    it('should include align class', () => {
      const text = 'Guess what? I am a notice';
      const notice = shallow(<Notice align="center">{text}</Notice>)
        .find('NoticeWrapper')
        .dive();
      expect(notice.hasClass('notice-center')).toEqual(true);
    });

    it('should include weight class', () => {
      const weight = 'bold';
      const text = 'Guess what? I am a notice';
      const notice = shallow(<Notice weight={weight}>{text}</Notice>)
        .find('NoticeWrapper')
        .dive();
      expect(notice.hasClass(`notice-${weight}`)).toEqual(true);
    });

    it('should include type class', () => {
      const type = 'warning';
      const text = 'Guess what? I am a notice';
      const notice = shallow(<Notice type={type}>{text}</Notice>)
        .find('NoticeWrapper')
        .dive();
      expect(notice.hasClass(`notice-${type}`)).toEqual(true);
    });
  });

  describe('Text String', () => {
    it('should render a simple text string', () => {
      const text = 'Guess what? I am a notice';
      const notice = shallow(<Notice>{text}</Notice>)
        .find('NoticeWrapper')
        .dive();
      expect(notice.find('p').text()).toEqual(text);
    });
  });

  describe('Custom HTML', () => {
    it('should render a custom <p> wrapper without double wrapping', () => {
      const className = 'test-class-name';
      const text =
        'Guess what? I am a notice with a custom wrapper paragraph tag';
      const content = <p className={className}>{text}</p>;
      const notice = shallow(<Notice>{content}</Notice>)
        .find('NoticeWrapper')
        .dive();
      expect(notice.find('p')).toHaveLength(1);
      expect(notice.find(`.${className}`)).toHaveLength(1);
      expect(notice.find('p').text()).toEqual(text);
    });
  });

  describe('Close Button', () => {
    it('should trigger the onClose event when the close button is clicked', () => {
      let hasClosed = false;

      function handleOnClose () {
        hasClosed = true;
      }

      const text = 'Guess what? I am a notice';
      const notice = shallow(<Notice onClose={handleOnClose}>{text}</Notice>)
        .find('NoticeWrapper')
        .dive();

      notice.find('.notice-close').simulate('click');

      expect(hasClosed).toEqual(true);
    });
  });
});
