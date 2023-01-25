import ApplicationSerializer from './application';
import { isPresent } from '@ember/utils';

export default class StripeAccountSerializer extends ApplicationSerializer {
  normalize (modelClass, account) {
    account.external_accounts = account.external_accounts.data;

    return super.normalize (...arguments);
  }

  normalizeSingleResponse (store, primaryModelClass, payload, id, requestType) {
    if (requestType !== 'deleteRecord') {
      let { 'stripe-account': account } = payload;

      if (isPresent (account.external_accounts)) {
        account.external_accounts = account.external_accounts.data;
      }
    }

    return super.normalizeSingleResponse (...arguments);
  }
}
