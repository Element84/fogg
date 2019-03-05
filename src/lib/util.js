/**
 * isSmallDevice
 */

function isSmallDevice () {
  if (typeof window === 'undefined') return;

  // TODO: base this off of a configurable variable along with SCSS settings

  return window.innerWidth < 1024;
}

module.exports.isSmallDevice = isSmallDevice;

/**
* throttle
* Via https://remysharp.com/2010/07/21/throttling-function-calls
*/

function throttle (fn, threshhold, scope) {
  threshhold || (threshhold = 250);

  let last;
  let deferTimer;

  return function () {
    // Check to see if we're working with an event as the first argument (standard)

    if (arguments[0] && arguments[0].target) {
    // Check if persist exists as a function. React handles events synthetically
      // and nullifys them through a pooling process. Adding persist keeps this from
      // happening until standard garbage collection so we can retain the event
      // information through the callback
      // More info: https://facebook.github.io/react/docs/events.html#event-pooling

      if (typeof arguments[0].persist === 'function') {
        arguments[0].persist();
      }
    }

    const context = scope || this;
    const now = +new Date();
    const args = arguments;

    if (last && now < last + threshhold) {
      // hold on to it

      clearTimeout(deferTimer);

      deferTimer = setTimeout(function () {
        last = now;

        fn.apply(context, args);
      }, threshhold);
    } else {
      last = now;

      fn.apply(context, args);
    }
  };
}

module.exports.throttle = throttle;

/**
   * routeIsInternal
   */

function routeIsInternal (route) {
  return route.charAt(0) === '/';
}

module.exports.routeIsInternal = routeIsInternal;
