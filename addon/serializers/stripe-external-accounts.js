import ApplicationSerializer from './application';

export default class StripeExternalAccountsSerializer extends ApplicationSerializer {
  keyForAttribute(key) {
    return key === 'items' ? 'data' : super.keyForAttribute(...arguments);
  }
}
