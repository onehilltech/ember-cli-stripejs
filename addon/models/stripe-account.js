import Model, { attr } from '@ember-data/model';
import { fragment } from 'ember-data-model-fragments/attributes';
import { equal } from '@ember/object/computed';

export default class StripeAccountModel extends Model {
  @attr ('stripe-date')
  created;

  @attr
  businessType;

  @equal ('businessType', 'individual')
  isIndividual;

  @equal ('businessType', 'company')
  isCompany;

  @equal ('businessType', 'non_profit')
  isNonProfit;

  @equal ('businessType', 'government_entity')
  isGovernmentEntity

  @fragment ('stripe-business-profile')
  businessProfile;

  @attr
  country

  @fragment ('stripe-company')
  company;

  @fragment ('stripe-person-fragment')
  individual;

  @attr
  capabilities;

  @attr ('boolean', { serialize: false} )
  chargesEnabled;

  get chargesDisabled () {
    return !this.chargesEnabled;
  }

  @attr ('boolean', {serialize: false})
  payoutsEnabled;

  get payoutsDisabled () {
    return !this.payoutsEnabled;
  }

  @attr
  defaultCurrency;

  @attr ('boolean', {serialize: false})
  detailsSubmitted;

  get detailsNotSubmitted () {
    return !this.detailsSubmitted;
  }

  @attr
  email;

  @fragment ('stripe-external-accounts', {serialize: false})
  externalAccounts;

  @attr
  externalAccount;

  @fragment ('stripe-tos-acceptance', {serialize: false})
  tosAcceptance;

  @attr ({serialize: false})
  verification;
}
