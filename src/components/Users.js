import React from 'react';

import UsersTable from './UsersTable';

// going to add user name, org, and plan
// take user data and display it in a table
// give every user a className

const userData = [
  {
    name: 'Michael Scott',
    organization: 'Michael Scott Paper Company',
    plan: 'Admin'
  },
  {
    name: 'Dwight Shroot',
    organization: 'Dunder Mifflin',
    plan: 'Premium'
  },
  {
    name: 'Bob Vance',
    organization: 'Vance Refridgeration',
    plan: 'Admin'
  }
];

const Users = () => {
  const headers = ['Name', 'Organization', 'Plan'];
  // map over data and return everything as seperata arrays
  const users = [userData.map(user => Object.values(user))];

  return <UsersTable headers={headers} users={users} />;
};

export default Users;
