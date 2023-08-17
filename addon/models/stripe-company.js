import Fragment from 'ember-data-model-fragments/fragment';

import { attr } from '@ember-data/model';
import { fragment } from 'ember-data-model-fragments/attributes';

export default class StripeCompanyFragment extends Fragment {
  @fragment('stripe-address')
  address;

  @attr
  phone;

  @attr('boolean', { serialize: false })
  directorsProvided;

  @attr('boolean', { serialize: false })
  executivesProvided;

  @attr('boolean', { serialize: false })
  ownersProvided;

  @attr
  name;

  @attr
  structure;

  /// The tax id for the company. This property is for setting the tax id. If a tax
  /// id has been provided, this attribute will be null and taxIdProvided will be true.
  @attr
  taxId;

  @attr('boolean', { serialize: false })
  taxIdProvided;

  get taxIdNotProvided() {
    return !this.taxIdProvided;
  }
}
