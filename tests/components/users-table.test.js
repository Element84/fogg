// import React from 'react';
// import { shallow } from 'enzyme';
// import sinon from 'sinon';

// import UsersTable from 'components/UsersTable';
// import Button from 'components/Button';

// describe('Users Table', () => {
//   const userData = [
//     {
//       id: 1,
//       firstName: 'Michael',
//       lastName: 'Scott',
//       address: {
//         street: '1725 Slough Avenue suite 100',
//         city: 'Scranton',
//         state: 'PA',
//         zip: 18505
//       },
//       organization: 'Michael Scott Paper Company',
//       role: 'Admin'
//     },
//     {
//       id: 2,
//       firstName: 'Dwight',
//       lastName: 'Shroot',
//       address: {
//         street: '1725 Slough Avenue suite 200',
//         city: 'Scranton',
//         state: 'PA',
//         zip: 18505
//       },
//       organization: 'Dunder Mifflin',
//       role: 'Premium'
//     },
//     {
//       id: 3,
//       firstName: 'Bob',
//       lastName: 'Vance',
//       address: {
//         street: '1725 Slough Avenue suite 210',
//         city: 'Scranton',
//         state: 'PA',
//         zip: 18505
//       },
//       organization: 'Vance Refridgeration',
//       role: 'Admin'
//     }
//   ];

//   const columns = ['Last Name', 'First Name', 'Organization', 'Role'];

//   const rows = userData.map(
//     ({ lastName, firstName, organization, role }, index) => {
//       return [
//         lastName,
//         firstName,
//         organization,
//         role,
//         <Button key={`UsersTable-Button-${index}`} />
//       ];
//     }
//   );

//   const wrapper = shallow(<UsersTable headers={columns} users={userData} />);
//   console.log('debugger: ', wrapper.find('table').debug());

//   describe('Render', () => {
//     const usersTable = shallow(
//       <UsersTable headers={columns} users={userData} />
//     );

//     it('should render a table header', () => {
//       console.log('user table: ', usersTable.html());
//       console.log(
//         'header: ',
//         usersTable
//           .dive()
//           .find('table')
//           .find('thead')
//           .find('td')
//           .html()
//       );
//       expect(
//         usersTable
//           .find('tbody')
//           .find('TableRow')
//           .first()
//           .props().cells
//       ).toEqual(columns);
//     });

//     it('should render a table row', () => {
//       expect(
//         usersTable
//           .find('tbody')
//           .find('TableRow')
//           .first()
//           .props().cells
//       ).toEqual(rows[0]);
//     });
//   });

//   describe('Props', () => {
//     const usersTable = shallow(
//       <UsersTable headers={columns} users={userData} />
//     );

//     // expect rows[0] === columns
//     it('should display custom headers', () => {
//       console.log(
//         'tbody',
//         usersTable
//           .find('tbody')
//           .find('TableRow')
//           .first()
//           .props('cells')
//       );
//       expect(
//         usersTable
//           .find('tbody')
//           .find('TableRow')
//           .first()
//           .props().cells
//       ).toEqual(`columns`);
//     });

//     // expect users === usersData
//     it('should take in userData as users prop', () => {
//       console.log('user props: ', usersTable.props(users));
//       console.log('also maybe props: ', usersTable.props('users.rows'));
//       expect(usersTable.props('users')).toEqual(`{[${columns}], [${rows}]}`);
//     });
//   });
// });
