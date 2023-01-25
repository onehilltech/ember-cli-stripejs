import ApplicationSerializer from './application';
import { isPresent } from '@ember/utils';

export default class StripeExternalAccountSerializer extends ApplicationSerializer {
  keyForAttribute (key) {
    return key === 'source' ? 'id' : super.keyForAttribute (...arguments);
  }

  payloadKeyFromModelName (/* modelName */) {
    return 'stripe_external_account';
  }

  serialize (snapshot) {
    let json = super.serialize (...arguments);
    const { record: { token } } = snapshot;

    if (isPresent (token)) {
      json.token = token.id;
    }

    return json;
  }
}
