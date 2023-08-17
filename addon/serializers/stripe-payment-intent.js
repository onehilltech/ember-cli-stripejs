import ApplicationSerializer from './application';

export default class StripePaymentMethodSerializer extends ApplicationSerializer {
  modelNameFromPayloadKey(key) {
    return key === 'paymentIntent' ? 'stripe-payment-intent' : key;
  }
}
