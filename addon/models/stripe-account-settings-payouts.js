import MF from 'ember-data-model-fragments';
import { attr } from '@ember-data/model';
import { fragment } from 'ember-data-model-fragments/attributes';

export default class StripeAccountSettingsPayoutsFragment extends MF.Fragment {
  @attr('boolean')
  debitNegativeBalances;

  @fragment('stripe-account-settings-payouts-schedule')
  schedule;

  @attr
  statementDescriptor;
}
