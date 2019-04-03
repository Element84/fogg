// import React from 'react';
// import { storiesOf } from '@storybook/react';

// import Table from '../../components/Table';
// import Button from '../../components/Button';
// import UsersTable from '../../components/UsersTable';

// const userData = [
//   {
//     id: 1,
//     firstName: 'Michael',
//     lastName: 'Scott',
//     address: {
//       street: '1725 Slough Avenue suite 100',
//       city: 'Scranton',
//       state: 'PA',
//       zip: 18505
//     },
//     organization: 'Michael Scott Paper Company',
//     role: 'Admin'
//   },
//   {
//     id: 2,
//     firstName: 'Dwight',
//     lastName: 'Shroot',
//     address: {
//       street: '1725 Slough Avenue suite 200',
//       city: 'Scranton',
//       state: 'PA',
//       zip: 18505
//     },
//     organization: 'Dunder Mifflin',
//     role: 'Premium'
//   },
//   {
//     id: 3,
//     firstName: 'Bob',
//     lastName: 'Vance',
//     address: {
//       street: '1725 Slough Avenue suite 210',
//       city: 'Scranton',
//       state: 'PA',
//       zip: 18505
//     },
//     organization: 'Vance Refridgeration',
//     role: 'Admin'
//   }
// ];

// const columns = ['Name', 'Organization', 'Role'];
// const rows = userData.map(({ firstName, lastName, organization, role }) => {
//   return [`${firstName} ${lastName}`, organization, role, <Button />];
// });

// const stories = storiesOf('Components|UsersTable', module);

// stories.add('Users Table', () => {
//   return (
//     <Table columns={columns} rows={rows} />
// <UsersTable columns={columns} rows={userData} />
//   );
// });
