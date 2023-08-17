import StripeTokenModel from './stripe-token';

import { attr } from '@ember-data/model';
import { isPresent } from '@ember/utils';

export default class StripeCardTokenModel extends StripeTokenModel {
  @attr('string')
  number;

  @attr('string')
  last4;

  @attr('string')
  cvc;

  @attr('string')
  cvcCheck;

  get cvcFail() {
    return this.cvcCheck === 'fail';
  }

  get cvcPass() {
    return this.cvcCheck === 'pass';
  }

  get cvcUnchecked() {
    return this.cvcCheck === 'unchecked';
  }

  get cvcUnavailable() {
    return this.cvcCheck === 'unavailable';
  }

  @attr('number')
  expMonth;

  @attr('number')
  expYear;

  get expiry() {
    const { expMonth, expYear } = this;
    return isPresent(expMonth) && isPresent(expYear)
      ? `${expMonth}/${expYear.toString().slice(-2)}`
      : null;
  }

  get expiryFullYear() {
    const { expMonth, expYear } = this;
    return isPresent(expMonth) && isPresent(expYear)
      ? `${expMonth}/${expYear}`
      : null;
  }

  @attr('string')
  name;

  @attr('string')
  brand;

  @attr('country')
  country;

  @attr('string')
  funding;

  @attr('string')
  addressCity;

  @attr('string')
  addressCountry;

  @attr('string')
  addressLine1;

  @attr('boolean')
  addressLine1Check;

  @attr('string')
  addressLine2;

  @attr('string')
  addressState;

  @attr('string')
  addressZip;

  @attr('boolean')
  addressZipCheck;

  get description() {
    return `${this.brand} - ${this.funding} (ending in ${this.last4})`;
  }

  get isComplete() {
    return (
      isPresent(this.name) &&
      isPresent(this.number) &&
      isPresent(this.cvc) &&
      isPresent(this.expMonth) &&
      isPresent(this.expYear)
    );
  }
}
