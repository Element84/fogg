import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';
import Button from './Button';

const DEFAULT_HEADERS = [
  'Last Name',
  'First Name',
  'Organization',
  'Role',
  null
];

const UsersTable = ({ headers = DEFAULT_HEADERS, users }) => {
  const rows = users.map(
    ({ lastName, firstName, organization, role }, index) => {
      return [
        lastName,
        firstName,
        organization,
        role,
        <Button key={`UsersTable-Button-${index}`} />
      ];
    }
  );

  return <Table columns={headers} rows={rows} />;
};

UsersTable.propTypes = {
  headers: PropTypes.array,
  users: PropTypes.array
};

export default UsersTable;
