import MF from 'ember-data-model-fragments';
import { attr } from '@ember-data/model';
import { fragment } from 'ember-data-model-fragments/attributes';

export default class StripeAccountSettingsFragment extends MF.Fragment {
  @attr
  bacsDebitPayments;

  @attr
  branding;

  @attr
  cardIssuing;

  @attr
  cardPayments;

  @attr
  dashboard;

  @fragment('stripe-account-settings-payouts')
  payouts;

  @attr
  payments;

  @attr
  sepaDebitPayments;
}
