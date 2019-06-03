import { isDomAvailable, queryParamsToObject } from '../lib/util';

export default function useLocation () {
  if (!isDomAvailable()) return {};

  let { pathname, search } = window.location;

  const queryParams = queryParamsToObject(search);

  if (pathname.substr(-1) !== '/') {
    pathname = `${pathname}/`;
  }

  return {
    pathname,
    queryParams
  };
}
