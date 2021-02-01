import Model, { attr } from '@ember-data/model';

export default class StripePaymentMethodModel extends Model {
  @attr('boolean')
  livemode;

  @attr
  card;

  @attr
  billingAddress;

  @attr
  customer;
}
