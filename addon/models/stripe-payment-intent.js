import Model, { attr, belongsTo } from '@ember-data/model';

export default class StripePaymentIntentModel extends Model {
  @attr ('number')
  amount;

  @attr
  canceledAt;

  @attr
  cancellationReason;

  @attr
  captureMethod;

  @attr
  clientSecret;

  @attr
  confirmationMethod;

  @attr
  currency;

  @attr
  description;

  @attr
  receiptEmail;

  @attr
  status;

  @belongsTo('stripe-payment-method')
  paymentMethod
}
