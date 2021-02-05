import { attr } from '@ember-data/model';
import MF from 'ember-data-model-fragments';

export default class StripeTosAcceptanceFragment extends MF.Fragment {
  @attr('stripe-date')
  date;

  @attr
  ip;

  @attr
  userAgent;
}
