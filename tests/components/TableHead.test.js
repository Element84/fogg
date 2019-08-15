import React from 'react';
import { shallow } from 'enzyme';

import { TableHead } from '../../ui';

describe('TableHead', () => {
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
    const tableHead = shallow(
      <TableHead className={rowClassName} headers={headers} />
    );
    const tableHeadWithSort = shallow(
      <TableHead className={rowClassName} headers={headersWithSort} />
    );
    const tableHeadWithFilter = shallow(
      <TableHead className={rowClassName} headers={headersWithFilter} />
    );

    it('should render a th with the header/call the render function for the first header', () => {
      expect(
        tableHead
          .find('tr')
          .find('th')
          .first()
          .text()
      ).toEqual('First Name');
    });

    it('should have an updated className', () => {
      expect(tableHead.find('tr').hasClass(rowClassName)).toEqual(true);
    });

    it('should not render the sort icon when sort is not enabled', () => {
      expect(
        tableHead
          .find('tr')
          .find('th')
          .first()
          .find('FaSort')
          .exists()
      ).toEqual(false);
    });

    it('should render the sort icon when sort is enabled', () => {
      expect(
        tableHeadWithSort
          .find('tr')
          .find('th')
          .first()
          .find('FaSort')
          .exists()
      ).toEqual(true);
    });

    it('should not render the filter when filter is not enabled', () => {
      expect(
        tableHead
          .find('tr')
          .find('th')
          .first()
          .find('.filters')
          .exists()
      ).toEqual(false);
    });

    it('should render the filter when filter is enabled', () => {
      expect(
        tableHeadWithFilter
          .find('tr')
          .find('th')
          .first()
          .find('.filters')
          .exists()
      ).toEqual(true);
      expect(
        tableHeadWithFilter
          .find('tr')
          .find('th')
          .first()
          .find('.filters')
          .text()
      ).toEqual('test filter 1');
    });
  });
});
