import MF from 'ember-data-model-fragments';
import { fragmentArray, fragment } from 'ember-data-model-fragments/attributes';
import { attr } from '@ember-data/model';

export default class StripeBalanceFundFragment extends MF.Fragment {
  @attr('number')
  amount;

  @attr
  currency;

  @fragment('stripe-balance-fund-source-type')
  sourceTypes;
}