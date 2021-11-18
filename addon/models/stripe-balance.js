import Model from '@ember-data/model';
import { fragmentArray } from 'ember-data-model-fragments/attributes';

export default class StripeBalanceModel extends Model {
  @fragmentArray('stripe-balance-fund')
  available;

  @fragmentArray('stripe-balance-fund')
  pending;

  @fragmentArray('stripe-balance-fund')
  instantAvailable;
}
