// import React from 'react';
// import PropTypes from 'prop-types';

// import WonderLink from './WonderLink';

// const columns = ['one', 'two'];

// const data = [
//   ['column 1', <button label="column two" />],
//   [<p>column one again</p>, 'column two stuff again']
// ];

// console.log('columns', columns.map(column => <th>{column}</th>));
// console.log(
//   // 'rows and cells',
//   data.map((row, index) => [
//     <tr key={`row-${index}`}>
//       {row.map((cell, key) => {
//         <td key={`row-${key}`}>{cell}</td>;
//       })}
//     </tr>
//   ])
// );

// const Table = () => {
//   return (
//     <table>
//     (
//       <thead>
//         <tr>
//           {columns.map(column => {
//             <th>{column}</th>;
//           })}
//         </tr>
//       </thead>
//     ),
//     <tbody>
//     data.map((row, index) => [
//       <tr key={`row-${index}`}>
//         {row.map((cell, key) => {
//           <td key={`row-${key}`}>{cell}</td>;
//         })}
//       </tr>

//     ])
//     </tbody>
//     </table>
//   );
// };

// stuff can be any datatype so not sure how to do propTypes

// Table.protoTypes = {}

// export default Table;
