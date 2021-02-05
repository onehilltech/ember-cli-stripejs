import MF from 'ember-data-model-fragments';
import { attr } from '@ember-data/model';

export default class StripeCardFragment extends MF.Fragment {
  @attr
  brand;

  @attr
  country;

  @attr
  expYear;

  @attr
  expMonth;

  @attr
  fingerprint;

  @attr
  funding;

  @attr
  last4;
}
