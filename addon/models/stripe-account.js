import Model, { attr } from '@ember-data/model';
import { fragment } from 'ember-data-model-fragments/attributes';

export default class StripeAccountModel extends Model {
  @attr ('stripe-date')
  created;

  @attr
  businessType;

  @fragment ('stripe-business-profile')
  businessProfile;

  @attr
  country

  @fragment ('stripe-company')
  company;

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

  @fragment ('stripe-tos-acceptance', {serialize: false})
  tosAcceptance;

  @attr ({serialize: false})
  verification;
}
