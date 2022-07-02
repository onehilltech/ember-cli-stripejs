import MF from 'ember-data-model-fragments';
import { attr } from '@ember-data/model';

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
