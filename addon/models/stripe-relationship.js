import MF from 'ember-data-model-fragments';
import { attr } from '@ember-data/model';

export default class StripeRelationshipFragment extends MF.Fragment {
  @attr ('boolean')
  director;

  @attr ('boolean')
  executive;

  @attr ('boolean')
  owner;

  @attr ('number')
  percentOwnership;

  @attr ('boolean')
  representative;

  @attr
  title;
}
