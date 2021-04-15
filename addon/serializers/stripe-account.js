import ApplicationSerializer from './application';

export default class StripeAccountSerializer extends ApplicationSerializer {
  normalizeSingleResponse (store, primaryModelClass, payload, id, requestType) {
    let { 'stripe-account': account } = payload;
    account.external_accounts = account.external_accounts.data;

    return super.normalizeSingleResponse (...arguments);
  }
}
