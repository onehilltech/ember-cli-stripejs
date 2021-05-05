import ApplicationSerializer from './application';
import { isPresent } from '@ember/utils';

export default class StripePaymentMethodSerializer extends ApplicationSerializer {
  modelNameFromPayloadKey (key) {
    return key === 'paymentMethod' ? 'stripe-payment-method' : key;
  }

  normalizeSingleResponse(store, primaryModelClass, payload) {
    if (isPresent (payload.paymentMethod)) {
      // We are going to delete te type property from the payload.
      delete payload.paymentMethod.type;
    }

    return super.normalizeSingleResponse (...arguments);
  }
}
