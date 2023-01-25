import Fragment from 'ember-data-model-fragments/fragment';
import { attr } from '@ember-data/model';

import { memberAction } from 'ember-api-actions';
import { fragmentOwner } from 'ember-data-model-fragments/attributes';

export default class StripeExternalAccountFragment extends Fragment {
  @attr
  source;

  @attr
  account;

  @attr
  accountHolderName;

  @attr
  accountHolderType;

  @attr
  bankName;

  @attr
  country;

  @attr
  currency;

  @attr('boolean')
  defaultForCurrency;

  @attr
  fingerprint;

  @attr
  last4;

  @attr
  routingNumber;

  @attr
  status;

  get isNew () {
    return this.status === 'new';
  }

  get isValidated () {
    return this.status === 'validated';
  }

  get isVerified () {
    return this.status === 'verified';
  }

  get isVerificationFailed () {
    return this.status === 'verification_failed';
  }

  get isErrored () {
    return this.status === 'errored';
  }

  /**
   * Get the merchant that owns this external account.
   */
  @fragmentOwner
  accounts;

  /**
   * Make this account the default for its currency.
   */
  update = memberAction ({
    type: 'put',
    urlType: 'updateRecord',

    after (response) {
      const { external_account } = response;

      if (external_account) {
        const modelName = this.constructor.modelName;
        const store = this.store;
        const primaryModelClass = store.modelFor (modelName);
        const serializer = store.serializerFor (modelName);

        const { data } = serializer.normalize (primaryModelClass, external_account);

        this.setProperties (data.attributes);
      }
    }
  });

  /**
   * Remove an external account from the merchant account.
   */
  remove = memberAction ({
    type: 'delete',
    urlType: 'deleteRecord'
  });
}
