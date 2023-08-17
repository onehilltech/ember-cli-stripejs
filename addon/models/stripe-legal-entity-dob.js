import Fragment from 'ember-data-model-fragments/fragment';
import { attr } from '@ember-data/model';
import { date as dateInput } from 'ember-cli-input-helpers/computed';

export default class StripeLegalEntityDobFragment extends Fragment {
  @attr('number', { allowNull: false })
  day;

  @attr('number', { allowNull: false })
  month;

  @attr('number', { allowNull: false })
  year;

  @attr('date')
  date;

  @dateInput('date')
  dateInput;
}
