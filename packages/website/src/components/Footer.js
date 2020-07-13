import React from 'react';

import { useSiteMetadata } from 'hooks';

import Container from 'components/Container';

const Footer = () => {
  const { companyName, companyUrl } = useSiteMetadata();

  return (
    <footer>
      <Container>
        <p>
          <span>
            From <a href={companyUrl}>{companyName}</a>
          </span>
          <span>&copy; {new Date().getFullYear()}</span>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
