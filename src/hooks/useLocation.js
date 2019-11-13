import { isDomAvailable, queryParamsToObject } from '../lib/util';

export default function useLocation () {
  if (!isDomAvailable()) return {};

  const { location, history } = window;
  let { pathname, search } = location;

  const queryParams = queryParamsToObject(search);

  if (pathname.substr(-1) !== '/') {
    pathname = `${pathname}/`;
  }

  return {
    location,
    history,
    pathname,
    search,
    queryParams
  };
}
