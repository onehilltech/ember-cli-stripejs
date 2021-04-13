import ApplicationSerializer from './application';

export default class StripePersonSerializer extends ApplicationSerializer {
  primaryKey = 'id';

  payloadKeyFromModelName (/* modelName */) {
    return 'stripe-person';
  }

  modelNameFromPayloadKey (/* key */) {
    return 'stripe-person';
  }

  keyForAttribute (attr) {
    return attr === 'ssnLast4' ? 'ssn_last_4' : super.keyForAttribute (...arguments);
  }
}
