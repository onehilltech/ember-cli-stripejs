import StripeTokenModel from "./stripe-token";
import { attr } from '@ember-data/model';
import { equal } from '@ember/object/computed';

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

  @equal ('status', 'new')
  isNew;

  @equal ('status', 'verified')
  isVerified;

  @equal ('status', 'validated')
  isValidated;

  @equal ('status', 'errored')
  errored;

  @equal ('status', 'verification_failed')
  verificationFailed;
}
