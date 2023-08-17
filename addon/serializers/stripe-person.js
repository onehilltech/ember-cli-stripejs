import ApplicationSerializer from './application';

export default class StripePersonSerializer extends ApplicationSerializer {
  primaryKey = 'id';

  payloadKeyFromModelName(/* modelName */) {
    return 'stripe-person';
  }

  modelNameFromPayloadKey(/* key */) {
    return 'stripe-person';
  }

  keyForAttribute(attr) {
    if (attr === 'ssnLast4') {
      return 'ssn_last_4';
    } else if (attr === 'ssnLast4Provided') {
      return 'ssn_last_4_provided';
    } else {
      return super.keyForAttribute(...arguments);
    }
  }
}
