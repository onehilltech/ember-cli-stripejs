import RESTSerializer from '@ember-data/serializer/rest';
import { underscore, camelize } from '@ember/string';

export default class StripePaymentMethodSerializer extends RESTSerializer {
  primaryKey = 'id';

  keyForAttribute (key) {
    return underscore (key);
  }

  modelNameFromPayloadKey (key) {
    return key === 'paymentMethod' ? 'stripe-payment-method' : key;
  }
}
