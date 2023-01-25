import StripeTokenModel from "./stripe-token";
import { attr } from '@ember-data/model';

export default class StripeBankAccountTokenModel extends StripeTokenModel {
  @attr ('string')
  accountHolderName;

  @attr ('string')
  accountHolderType;

  @attr ('string')
  bankName;

  @attr ('string')
  country;

  @attr ('string')
  currency;

  @attr ('string')
  fingerprint;

  @attr ('string')
  accountNumber;

  @attr ('string')
  last4;

  @attr ('string')
  routingNumber;

  @attr ('string')
  status;

  get isNewAccount () {
    return this.status === 'new';
  }

  get isVerified () {
    return this.status === 'verified';
  }

  get isValidated () {
    return this.status === 'validated';
  }

  get errored () {
    return this.status === 'errored';
  }

  get verificationFailed () {
    return this.status === 'verification_failed';
  }
}
