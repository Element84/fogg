import PromiseCancelable from 'p-cancelable';
import { geocode } from 'esri-leaflet-geocoder';

/**
 * geocodePlacename
 * @description Cancellable promise that performs a geocode request on the given placename
 */

export function geocodePlacename(placename) {
  return new PromiseCancelable((resolve, reject, onCancel) => {
    if (!geocode) {
      reject('geocodePlacename Error: Geocode not available.');
    }
    const request = geocode()
      .text(placename)
      .run((error, body, response) => {
        if (error) reject(error);
        resolve(response);
      }, this);

    onCancel(() => {
      request.abort();
    });
  });
}