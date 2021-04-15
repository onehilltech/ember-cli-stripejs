import { fragment } from 'ember-data-model-fragments/attributes';
import { isPresent } from '@ember/utils';
import { attr } from "@ember-data/model";
import Fragment from 'ember-data-model-fragments/fragment';

export default class StripePersonFragment extends Fragment {
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

  @fragment('stripe-requirements', { serialize: false })
  requirements;

  @fragment('stripe-relationship')
  relationship;

  @attr
  ssnLast4;

  @attr ({ serialize: false })
  ssnLast4Provided;
}