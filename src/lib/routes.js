/**
 * routeIsInternal
 */

export function routeIsInternal(route) {
  return route.charAt(0) === '/';
}