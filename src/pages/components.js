import React from 'react';

import Layout from '../components/Layout';
import WonderLink from '../components/WonderLink';

import ButtonDemo from './components/button';
import FooterDemo from './components/footer';

import '../assets/stylesheets/theme.scss';

const DEMO_COMPONENTS = [
  {
    id: 'button',
    label: 'Button',
    component: ButtonDemo
  },
  {
    id: 'footer',
    label: 'Footer',
    component: FooterDemo
  }
];

const ComponentsPage = () => {
  return (
    <Layout>
      <h1 className='component-title'>Space Jam Components</h1>
      <section className='description'>
        <p>The links and actions below will NOT zap all of your developer talent. However, clicking this basketball will! <span role="img" alt="basketball">🏀</span></p>
      </section>
      <section>
          <ul className="list-clean">
            { DEMO_COMPONENTS.map(( component, index ) => {

              return (
                <li key={ `DemoComponent-${ index }` }>
                  <WonderLink to={ `#${ component.id }` }>
                    { component.label }
                  </WonderLink>
                </li>
              );

            }) }
          </ul>
        </section>
      {/* </Hero> */}

      <div className="components-demo site-section animate-3">
        { DEMO_COMPONENTS.map(( component, index ) => {

          const Component = component.component;

          if ( !Component ) return null;

          return (
            <React.Fragment key={ `Component-${ index }` }>
              <div id={ component.id }>
                <Component />
              </div>

              <p className="text-center marg-top-3">
                <WonderLink to={ `components/${ component.id }` }>
                  { component.label }
                </WonderLink>
              </p>

              { index !== DEMO_COMPONENTS.length - 1 && (
                <hr className="marg-top-5 marg-bot-5" />
              ) }
            </React.Fragment>
          );

        }) }
      </div>
    </Layout>
  );
};

export default ComponentsPage;
