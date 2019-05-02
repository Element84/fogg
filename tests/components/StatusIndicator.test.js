import React from 'react';
import { shallow } from 'enzyme';

import { StatusIndicator } from '../../ui';

describe('Task Status', () => {
  const statusList = [
    {
      label: 'Completed',
      id: 'completed'
    },
    {
      label: 'Anomolly',
      id: 'anomolly'
    },
    {
      label: 'Nope',
      id: 'nope'
    }
  ];

  describe('Render', () => {
    const defaultStatus = shallow(
      <StatusIndicator activeId={statusList[0].id} statusList={statusList} />
    );
    const errorStatus = shallow(
      <StatusIndicator activeId={statusList[1].id} errorList={statusList} />
    );
    const unknownStatus = shallow(
      <StatusIndicator activeId={statusList[2].id} statusList={statusList} />
    );

    it('should render a default status', () => {
      const good = defaultStatus.find('.status-indicator-label').text();
      expect(good).toEqual('Completed');
    });

    it('should render an error status', () => {
      const error = errorStatus.find('.status-indicator-label').text();
      expect(error).toEqual('Anomolly');
    });

    it('should render an unkown status', () => {
      const umm = unknownStatus.find('.status-indicator-label').text();
      expect(umm).toEqual('Nope');
    });
  });
});
