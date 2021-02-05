import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';
import { not } from '@ember/object/computed'
import { fragment } from 'ember-data-model-fragments/attributes';

export default Fragment.extend({
  address: fragment ('stripe-address'),
  phone: DS.attr (),

  directorsProvided: DS.attr ('boolean', {serialize: false}),
  executivesProvided: DS.attr ('boolean', {serialize: false}),
  ownersProvided: DS.attr ('boolean', {serialize: false}),

  name: DS.attr (),
  structure: DS.attr (),

  /// The tax id for the company. This property is for setting the tax id. If a tax
  /// id has been provided, this attribute will be null and taxIdProvided will be true.
  taxId: DS.attr ('string'),
  taxIdProvided: DS.attr ('boolean', {serialize: false}),
  taxIdNotProvided: not ('taxIdProvided')
});
