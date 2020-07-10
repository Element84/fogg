import React from 'react';

import { useSiteMetadata } from 'hooks';

import Container from 'components/Container';

const Footer = () => {
  const { companyName, companyUrl } = useSiteMetadata();

  return (
    <footer>
      <Container>
        <p>
          &copy; { new Date().getFullYear() }, <a href={companyUrl}>{ companyName }</a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
