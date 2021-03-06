import ApplicationSerializer from './application';

export default class StripePaymentMethodSerializer extends ApplicationSerializer {
  modelNameFromPayloadKey (key) {
    return key === 'paymentMethod' ? 'stripe-payment-method' : key;
  }

  normalizeSingleResponse(store, primaryModelClass, payload) {
    // We are going to delete te type property from the payload.
    delete payload.paymentMethod.type;

    return super.normalizeSingleResponse (...arguments);
  }
}
