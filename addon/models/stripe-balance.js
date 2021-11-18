import Model from '@ember-data/model';
import { fragment } from 'ember-data-model-fragments/attributes';

export default class StripeBalanceModel extends Model {
  @fragment('stripe-balance-fund')
  available;

  @fragment('stripe-balance-fund')
  pending;
}
