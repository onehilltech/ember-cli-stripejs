import ApplicationSerializer from "./application";

export default class StripeSetupIntentSerializer extends ApplicationSerializer {
  modelNameFromPayloadKey (key) {
    return key === 'paymentIntent' ? 'stripe-payment-intent' : key;
  }
}
