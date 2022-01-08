import React from 'react';

import Container from './Container';

const Footer = () => {

  return (
    <footer>
      <Container>
        <p>
          <span>
            From <a href='https://element84.com'>Element 84, Inc.</a>
          </span>
          <span>&copy; {new Date().getFullYear()}</span>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
