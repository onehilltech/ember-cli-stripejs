import ApplicationSerializer from './application';

export default class StripePaymentMethodSerializer extends ApplicationSerializer {
  modelNameFromPayloadKey (key) {
    return key === 'paymentMethod' ? 'stripe-payment-method' : key;
  }
}
