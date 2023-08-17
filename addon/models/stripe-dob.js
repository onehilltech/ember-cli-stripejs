import MF from 'ember-data-model-fragments';
import { attr } from '@ember-data/model';

import moment from 'moment';

export default class StripeDobFragment extends MF.Fragment {
  @attr('number')
  day;

  @attr('number')
  month;

  @attr('number')
  year;

  set date(value) {
    let date = moment(value);

    this.month = date.month() + 1;
    this.day = date.date();
    this.year = date.year();
  }

  get date() {
    return moment({
      month: this.month - 1,
      date: this.day,
      year: this.year,
    }).toDate();
  }
}
