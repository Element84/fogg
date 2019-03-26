// import React from 'react';
// import PropTypes from 'prop-types';

// import WonderLink from './WonderLink';

// const columns = ['one', 'two'];

// const data = [
//   ['column 1', <button label="column two" />],
//   [<p>column one again</p>, 'column two stuff again']
// ];

// console.table(
//   'columns',
//   columns.map(column => {
//     <th>{column}</th>;
//   })
// );
// console.table(
//   data.map(row => [
//     <tr>
//       {row.map(cell => {
//         <td>{cell}</td>;
//       })}
//     </tr>
//   ])
// );

// const Table = () => {
//   return (
//     <thead>
//       <tr>
//         {columns.map(column => {
//           <th>{column}</th>;
//         })}
//       </tr>
//     </thead>
//     {Object.keys(data).map(key => (
//       data.map(row => [
//         <tr>
//           {
//             row.map(cell => {
//               <td key={key}>{ cell }</td>
//             })
//           }
//         </tr>
//       ])
//     ))}
//   );
// };

// stuff can be any datatype so not sure how to do propTypes

// Table.protoTypes = {}

// export default Table;
