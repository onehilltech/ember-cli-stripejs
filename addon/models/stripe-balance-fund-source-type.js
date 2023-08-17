import MF from 'ember-data-model-fragments';
import { attr } from '@ember-data/model';

export default class StripeBalanceFundSourceTypeFragment extends MF.Fragment {
  @attr('number')
  bankAccount;

  @attr('number')
  card;

  @attr('number')
  fpx;
}
