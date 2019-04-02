import React from 'react';
import PropTypes from 'prop-types';

import Table from './Table';

const columns = this.props.headers;
const rows = this.props.users;

const UsersTable = props => <Table columns={columns} rows={rows} />;

UsersTable.propTypes = {
  headers: PropTypes.array,
  users: PropTypes.array
};

export default UsersTable;
