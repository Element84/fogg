import React from 'react';
import { shallow } from 'enzyme';

import { TableHeaders } from '../../ui';

describe('TableHeaders', () => {
  const headers = [
    {
      render: function (item) {
        return this[item];
      },
      getHeaderProps: function () {},
      getSortByToggleProps: function () {},
      Header: 'First Name'
    },
    {
      render: function (item) {
        return this[item];
      },
      getHeaderProps: function () {},
      getSortByToggleProps: function () {},
      Header: 'Last Name'
    }
  ];

  const headersWithSort = [
    {
      render: function (item) {
        return this[item];
      },
      getHeaderProps: function () {},
      getSortByToggleProps: function () {},
      Header: 'First Name',
      canSort: true
    },
    {
      render: function (item) {
        return this[item];
      },
      getHeaderProps: function () {},
      getSortByToggleProps: function () {},
      Header: 'Last Name',
      canSort: true
    }
  ];

  const headersWithFilter = [
    {
      render: function (item) {
        return this[item];
      },
      getHeaderProps: function () {},
      getSortByToggleProps: function () {},
      Header: 'First Name',
      canFilter: true,
      Filter: 'test filter 1'
    },
    {
      render: function (item) {
        return this[item];
      },
      getHeaderProps: function () {},
      getSortByToggleProps: function () {},
      Header: 'Last Name',
      canFilter: true,
      Filter: 'test filter 2'
    }
  ];

  const rowClassName = 'row-test';

  describe('Render', () => {
    const tableHeaders = shallow(
      <TableHeaders className={rowClassName} headers={headers} />
    );
    const tableHeadersWithSort = shallow(
      <TableHeaders className={rowClassName} headers={headersWithSort} />
    );
    const tableHeadersWithFilter = shallow(
      <TableHeaders className={rowClassName} headers={headersWithFilter} />
    );

    it('should render a th with the header/call the render function for the first header', () => {
      expect(
        tableHeaders
          .find('tr')
          .find('th')
          .first()
          .text()
      ).toEqual('First Name');
    });

    it('should have an updated className', () => {
      expect(tableHeaders.find('tr').hasClass(rowClassName)).toEqual(true);
    });

    it('should not render the sort icon when sort is not enabled', () => {
      expect(
        tableHeaders
          .find('tr')
          .find('th')
          .first()
          .find('FaSort')
          .exists()
      ).toEqual(false);
    });

    it('should render the sort icon when sort is enabled', () => {
      expect(
        tableHeadersWithSort
          .find('tr')
          .find('th')
          .first()
          .find('FaSort')
          .exists()
      ).toEqual(true);
    });

    it('should not render the filter when filter is not enabled', () => {
      expect(
        tableHeaders
          .find('tr')
          .find('th')
          .first()
          .find('.filters')
          .exists()
      ).toEqual(false);
    });

    it('should render the filter when filter is enabled', () => {
      expect(
        tableHeadersWithFilter
          .find('tr')
          .find('th')
          .first()
          .find('.filters')
          .exists()
      ).toEqual(true);
      expect(
        tableHeadersWithFilter
          .find('tr')
          .find('th')
          .first()
          .find('.filters')
          .text()
      ).toEqual('test filter 1');
    });
  });
});
