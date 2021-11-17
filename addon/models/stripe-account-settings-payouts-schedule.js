import MF from 'ember-data-model-fragments';
import { attr } from '@ember-data/model';
import { fragment } from 'ember-data-model-fragments/attributes';

export default class StripeAccountSettingsPayoutsScheduleFragment extends MF.Fragment {
  @attr('number')
  delayDays;

  @attr
  interval;

  @attr('number')
  monthlyAnchor;

  @attr
  weeklyAnchor;
}
