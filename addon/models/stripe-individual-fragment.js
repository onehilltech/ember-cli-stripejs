import Fragment, {fragment} from 'ember-data-model-fragments/fragment';
import {attr} from "@ember-data/model";
import { isPresent } from '@ember/utils';

export default class StripeIndividualFragment extends Fragment {
  @attr ('stripe-date')
  created;

  @attr
  account;

  @attr
  firstName;

  @attr
  lastName;

  set name (value) {
    if (isPresent (value)) {
      [this.firstName, this.lastName] = value.split (' ');
    }
    else {
      this.firstName = this.lastName = null;
    }
  }

  get name () {
    let parts = [];

    if (isPresent (this.firstName)) {
      parts.push (this.firstName);
    }

    if (isPresent (this.lastName)) {
      parts.push (this.lastName);
    }

    return parts.join (' ');
  }

  @attr
  email;

  @attr
  phone;

  @fragment('stripe-address')
  address;

  @fragment('stripe-dob')
  dob;

  @attr
  metadata;

  @attr
  ssnLast4;
}