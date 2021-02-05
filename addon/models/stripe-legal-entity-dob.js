import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';
import { date as dateInput } from 'ember-cli-input-helpers/computed';

export default Fragment.extend({
  day: DS.attr ('number', {allowNull: false}),

  month: DS.attr ('number', {allowNull: false}),

  year: DS.attr ('number', {allowNull: false}),

  date: DS.attr ('date'),
  dateInput: dateInput ('date')
});
