import Model, { attr } from '@ember-data/model';

export default class StripeTokenModel extends Model {
  @attr ('string')
  type;

  @attr ('string')
  clientIp;

  @attr ('date')
  created;

  @attr ('boolean')
  liveMode;

  @attr ('boolean')
  used;
}
