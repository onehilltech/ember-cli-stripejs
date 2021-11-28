import MF from 'ember-data-model-fragments';
import { attr } from '@ember-data/model';

export default class StripeRelationshipFragment extends MF.Fragment {
  @attr ('boolean', { defaultValue: false })
  director;

  @attr ('boolean', { defaultValue: false })
  executive;

  @attr ('boolean', { defaultValue: false })
  owner;

  @attr ('number')
  percentOwnership;

  @attr ('boolean', { defaultValue: false })
  representative;

  @attr
  title;
}
