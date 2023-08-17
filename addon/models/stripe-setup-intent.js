import Model, { attr, belongsTo } from '@ember-data/model';

export default class StripeSetupIntentModel extends Model {
  @attr
  clientSecret;

  @attr
  description;

  @attr
  lastSetupError;

  @attr
  nextAction;

  @belongsTo('stripe-payment-method')
  paymentMethod;

  @attr
  paymentMethodTypes;

  @attr
  status;

  @attr
  usage;
}
