import React from 'react';
import { Link } from 'gatsby';

import { routeIsInternal } from '../lib/util';
import { useLocation } from '../hooks';

const ARGS_WHITELIST = ['className'];

/**
 * WonderLink
 * @description Returns a Link component or standard html <a> depending on "to" value
 */

const WonderLink = (args = {}) => {
  const componentArgs = filterArgs(args);
  const { pathname } = useLocation();

  if (typeof args.to !== 'string') return null;

  // If the first character is /, it's an internal link and we want to let the client
  // router handle the paging

  if (routeIsInternal(args.to)) {
    componentArgs.state = {
      ...componentArgs.state,
      prevPath: pathname
    };

    return (
      <Link to={args.to} {...componentArgs}>
        {args.children}
      </Link>
    );
  }

  // If it's an external link, add rel noopener and noreferrer to cover any security
  // concerns with the new window being able to access the previous page

  componentArgs.rel = 'noopener noreferrer';

  return (
    <a href={args.to} target={args.target} {...componentArgs}>
      {args.children}
    </a>
  );
};

export default WonderLink;

/**
 * filterArgs
 * @description Only returns the whitelisted arguments via ARGS_WHITELIST
 */

function filterArgs (args) {
  let newArgs = {};

  for (let key in args) {
    if (!args.hasOwnProperty(key)) continue;

    if (ARGS_WHITELIST.includes(key)) {
      newArgs[key] = args[key];
    }
  }

  return newArgs;
}
