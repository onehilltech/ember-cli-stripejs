import MF from 'ember-data-model-fragments';
import { array } from 'ember-data-model-fragments/attributes';
import { isPresent } from '@ember/utils';

export default class StripeRequirementsFragment extends MF.Fragment {
  @array('string')
  currentlyDue;

  @array('string')
  errors;

  @array('string')
  eventuallyDue;

  @array('string')
  pastDue;

  @array('string')
  pendingVerification;

  get isDue() {
    return isPresent(this.pastDue) || isPresent(this.currentlyDue);
  }
}
