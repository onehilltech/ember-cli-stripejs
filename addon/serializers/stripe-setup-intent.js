import ApplicationSerializer from './application';

export default class StripeSetupIntentSerializer extends ApplicationSerializer {
  modelNameFromPayloadKey(key) {
    return key === 'setupIntent' ? 'stripe-setup-intent' : key;
  }
}
