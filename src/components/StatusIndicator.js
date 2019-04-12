import React from 'react';
import PropTypes from 'prop-types';

const status = [
  'pending',
  'accepted',
  'rejected',
  'partially completed',
  'cancelled',
  'anomaly',
  'completed'
];

const circleOne = document.getElementById('1')
const circleTwo = document.getElementById('2')
const circleThree = document.getElementById('3')
const circleFour = document.getElementById('4')
// const active = statusCircle.map(i => {});
console.log('circle one: ', circleOne)
const StatusIndicator = ({ status }) => {
  // if (status === 'pending') {
  //   return circleOne.className += ' active'
   //} //else if (status === 'rejected' || 'cancelled' || 'anomally') {
  //   return circleOne.className = 'active-red'
  // } else if (status === 'accepted') {
  //   return circleTwo.className = 'active'
  // } else if (status === 'partially completed') {
  //   return circleThree.className = 'active'
  // } else if (status === 'completed') {
  //   return circleFour.className = 'active'
  // } else {
  //   // maybe this should return err
  //   return circleOne.className = 'active-red'
  // }
  return (
    <>
      <section className="status-indicator-circles">
        <div className="status-indicator-circle" id="1" />
        <div className="status-indicator-circle" id="2"/>
        <div className="status-indicator-circle active" id="3"/>
        <div className="status-indicator-circle" id="4"/>
      </section>
    </>
  );
  // make 4 circles 0 - 3
  // make circle active based on number returned
  // if circle also returns another var change color based on var
};

export default StatusIndicator;
