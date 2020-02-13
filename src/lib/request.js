import uuidv1 from 'uuid/v1';

/**
 * resolveMostRecent
 * @description Takes in a promise, ideally cancellable, and cancels previous instances
 */

let resolveMostRecentRequestGlobalNonce;
const resolveMostRecentRequestQueue = [];

export async function resolveMostRecent (promiseInvocation) {
  // Generate a unique ID and store it as a nonce

  const id = uuidv1();
  const localNonce = (resolveMostRecentRequestGlobalNonce = id);

  // If this instance of the local nonce doesn't match
  // the global one, it means it's stale, so return

  if (localNonce !== resolveMostRecentRequestGlobalNonce) return;

  // Push the current request into a globally stored
  // variable to allow us to keep track of history

  resolveMostRecentRequestQueue.push({
    id,
    promise: promiseInvocation
  });

  // Run through all previous requests, cancel any that
  // didn't complete and remove them from the request array

  resolveMostRecentRequestQueue
    .filter(request => request.id !== id && !request.promise.isCanceled)
    .forEach((request, index) => {
      request.promise.cancel();
      resolveMostRecentRequestQueue.splice(index, 1);
    });

  try {
    promiseInvocation = await promiseInvocation;
  } catch (e) {
    // A cancelled request throws an error, so if it's
    // cancelled, catch it and don't consider it one

    if (promiseInvocation.isCanceled) return;

    throw new Error(`Failed to geocode placename: ${e}`);
  }

  // Again, if this instance of the request doesn't match the
  // global one, we want to cancel it and return, to avoid
  // updating the application with stale data

  if (localNonce !== resolveMostRecentRequestGlobalNonce) {
    if (typeof promiseInvocation.cancel === 'function') {
      promiseInvocation.cancel('Canceling stale geocode placename request');
    }
    return;
  }

  return promiseInvocation;
}
