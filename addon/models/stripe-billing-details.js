import MF from 'ember-data-model-fragments';
import { fragment } from 'ember-data-model-fragments/attributes';
import { attr } from '@ember-data/model';

export default class StripeBillingDetailsFragment extends MF.Fragment {
  @fragment('stripe-address')
  address;

  @attr
  name;

  @attr
  email;

  @attr
  phone;
}
