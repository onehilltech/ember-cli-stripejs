import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';

import { equal } from '@ember/object/computed';
import { memberAction } from 'ember-api-actions';
import { fragmentOwner } from 'ember-data-model-fragments/attributes';

export default Fragment.extend ({
  source: DS.attr ('string'),

  account: DS.attr ('string'),

  accountHolderName: DS.attr ('string'),

  accountHolderType: DS.attr ('string'),

  bankName: DS.attr ('string'),

  country: DS.attr ('string'),

  currency: DS.attr ('string'),

  defaultForCurrency: DS.attr ('boolean'),

  fingerprint: DS.attr ('string'),

  last4: DS.attr ('string'),

  routingNumber: DS.attr ('string'),

  status: DS.attr ('string'),
  isNew: equal ('status', 'new'),
  isValidated: equal ('status', 'validated'),
  isVerified: equal ('status', 'verified'),
  isVerificationFailed: equal ('status', 'verification_failed'),
  isErrored: equal ('status', 'errored'),

  /**
   * Get the merchant that owns this external account.
   */
  accounts: fragmentOwner (),

  /**
   * Make this account the default for its currency.
   */
  update: memberAction ({
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
  }),

  /**
   * Remove an external account from the merchant account.
   */
  remove: memberAction ({
    type: 'delete',
    urlType: 'deleteRecord'
  })
});
