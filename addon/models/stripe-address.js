import MF from 'ember-data-model-fragments';

import { attr } from '@ember-data/model';
import { isPresent } from '@ember/utils';
import parser from 'parse-address';

export default class StripeAddressFragment extends MF.Fragment {
  @attr
  line1;

  @attr
  line2;

  @attr
  city;

  @attr
  state;

  @attr
  postalCode;

  @attr
  country;

  get full () {
    let address = '';

    if (isPresent (this.line1)) {
      address += this.line1;
    }

    if (isPresent (this.line2)) {
      address += ` ${this.line2}`;
    }

    if (isPresent (this.city)) {
      address += `, ${this.city}`;
    }

    if (isPresent (this.state)) {
      address += `, ${this.state}`;
    }

    if (isPresent (this.postalCode)) {
      address += ` ${this.postalCode}`;
    }

    if (isPresent (this.country)) {
      address += ` ${this.country}`;
    }

    return address;
  }

  set full (value) {
    if (isPresent (value)) {
      let parsed = parser.parseLocation (value);

      let lineParts = [];

      if (isPresent (parsed.number)) {
        lineParts.push (parsed.number);
      }

      if (isPresent (parsed.prefix)) {
        lineParts.push (parsed.prefix);
      }

      if (isPresent (parsed.street)) {
        lineParts.push (parsed.street);
      }

      if (isPresent (parsed.type)) {
        lineParts.push (parsed.type);
      }

      this.line1 = lineParts.join (' ');
      this.city = parsed.city;
      this.state = parsed.state;
      this.postalCode = parsed.zip;
    }
    else {
      this.city = this.country = this.line1 = this.line2 = this.postalCode = this.state = null;
    }
  }
}
