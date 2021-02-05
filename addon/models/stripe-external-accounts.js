import DS from 'ember-data';
import Fragment from 'ember-data-model-fragments/fragment';

import { fragmentArray, fragmentOwner } from 'ember-data-model-fragments/attributes';

export default Fragment.extend({
  items: fragmentArray ('stripe-external-account'),

  hasMore: DS.attr ('boolean'),

  totalCount: DS.attr ('number'),

  url: DS.attr (),

  stripe: fragmentOwner ()
});
