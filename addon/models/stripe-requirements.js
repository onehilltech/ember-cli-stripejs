import MF from 'ember-data-model-fragments';
import { attr } from '@ember-data/model';

export default class StripeRequirementsFragment extends MF.Fragment {
  @attr
  currentlyDue;

  @attr
  errors;

  @attr
  eventuallyDue;

  @attr
  pastDue;

  @attr
  pendingVerification;
}
