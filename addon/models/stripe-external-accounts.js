import Fragment from 'ember-data-model-fragments/fragment';
import { attr } from '@ember-data/model';

import { fragmentArray, fragmentOwner } from 'ember-data-model-fragments/attributes';

export default class StripeExternalAccountsFragment extends Fragment {
  @fragmentArray ('stripe-external-account')
  items;

  @attr ('boolean')
  hasMore;

  @attr ('number')
  totalCount;

  @attr
  url;

  @fragmentOwner
  stripe;
}
