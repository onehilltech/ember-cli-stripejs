import MF from 'ember-data-model-fragments';
import { attr } from '@ember-data/model';

export default class StripeAccountRequirementsFragment extends MF.Fragment {
  @attr
  alternatives;

  @attr
  currentDeadline;

  @attr
  currentlyDue;

  @attr
  disabledReason;

  @attr
  errors;

  @attr
  eventuallyDue;

  @attr
  pastDue;

  @attr
  pendingVerification;
}
