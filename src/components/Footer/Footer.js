import React from 'react';

// building the example of this footer based on e84 official website footer
const Footer = () => (
  <footer className="footer">
    <p>This is the footer for now</p>
    <section className="left-side">
      <div className="logo">{/* space jam logo goes here */}</div>
      <div className="snail-contact">
        {/* address and phone number goes here */}
      </div>
      <div className="site-map">{/* links to the rest of the site */}</div>
    </section>

    <section className="right-side">
      <div className="mailing-list-form">
        {/* import form for adding people to the mailing list. Will include button from the button component */}
      </div>
      <div className="social-media-links">
        {/* links to social media will be here */}
      </div>
    </section>
  </footer>
);

export default Footer;
