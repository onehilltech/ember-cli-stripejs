import ApplicationSerializer from './application';

export default class StripePersonSerializer extends ApplicationSerializer {
  primaryKey = 'id';

  payloadKeyFromModelName (/* modelName */) {
    return 'stripe-person';
  }

  modelNameFromPayloadKey (/* key */) {
    return 'stripe-person';
  }
}
