import Fragment from 'ember-data-model-fragments/fragment';
import { fragment, fragmentArray } from 'ember-data-model-fragments/attributes';

import { attr } from '@ember-data/model';

import { memberAction } from 'ember-api-actions';
import { serializeAndPush } from 'ember-blueprint-data';


export default class StripeAccountFragment extends Fragment {
  @attr('stripe-date')
  created;

  @attr
  type;

  @attr
  businessType;

  get isIndividual() {
    return this.businessType === 'individual';
  }

  get isCompany() {
    return this.businessType === 'company';
  }

  get isNonProfit() {
    return this.businessType === 'non_profit';
  }

  get isGovernmentEntity() {
    return this.businessType === 'government_entity';
  }

  @fragment('stripe-business-profile')
  businessProfile;

  @attr
  country;

  @fragment('stripe-company')
  company;

  @fragment('stripe-person-fragment')
  individual;

  @attr
  capabilities;

  @attr('boolean', { serialize: false })
  chargesEnabled;

  get chargesDisabled() {
    return !this.chargesEnabled;
  }

  @attr('boolean', { serialize: false })
  payoutsEnabled;

  get payoutsDisabled() {
    return !this.payoutsEnabled;
  }

  @attr
  defaultCurrency;

  @attr('boolean', { serialize: false })
  detailsSubmitted;

  get detailsNotSubmitted() {
    return !this.detailsSubmitted;
  }

  @attr
  email;

  @fragmentArray('stripe-external-account', { serialize: false })
  externalAccounts;

  get defaultExternalAccount() {
    return this.externalAccounts.findBy('defaultForCurrency', true);
  }

  @attr
  externalAccount;

  @fragment('stripe-tos-acceptance', { serialize: false })
  tosAcceptance;

  @attr({ serialize: false })
  verification;

  @fragment('stripe-account-requirements', { serialize: false })
  requirements;

  @attr({ serialize: false })
  futureRequirements;

  persons() {
    const adapterOptions = { account: this };
    return this.store.findAll('stripe-person', { adapterOptions });
  }

  person(id) {
    const adapterOptions = { account: this };
    return this.store.findRecord('stripe-person', id, { adapterOptions });
  }

  @fragment('stripe-account-settings')
  settings;

  /**
   * Get the balance of the account.
   *
   * @type {*}
   */
  getBalance = memberAction({
    path: 'balance',
    type: 'get',
    urlType: 'findRecord',
    after(response) {
      const { 'stripe-balance': balance } = response;
      balance.id = `balance_${this.id}`;

      return serializeAndPush({ model: 'stripe-balance' }).bind(this)(response);
    },
  });
}
