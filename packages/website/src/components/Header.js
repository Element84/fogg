import React from 'react';
import { Link } from 'gatsby';

import Container from 'components/Container';
import LogoFull from 'components/LogoFull';

const Header = () => {
  return (
    <header>
      <Container>
        <p><LogoFull /></p>
        <ul>
          <li>
            <Link to="http://fogg.element84.com/docs">Getting Started</Link>
          </li>
          <li>
            <Link to="https://github.com/Element84/fogg">View Source on Github</Link>
          </li>
        </ul>
      </Container>
    </header>
  );
};

export default Header;
