import { attr } from '@ember-data/model';
import MF from 'ember-data-model-fragments';

export default class StripeBusinessProfileFragment extends MF.Fragment {
  @attr
  name;

  @attr
  url;

  @attr
  productDescription;

  @attr
  mcc;
}
