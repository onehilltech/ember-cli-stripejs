import Model, { attr } from '@ember-data/model';
import { fragment } from 'ember-data-model-fragments/attributes';

export default class StripePaymentMethodModel extends Model {
  @attr('boolean')
  livemode;

  @attr
  type;

  @fragment ('stripe-card')
  card;

  @attr
  billingAddress;

  @attr
  customer;
}
