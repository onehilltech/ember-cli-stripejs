import RESTAdapter from '@ember-data/adapter/rest';
import { inject as service } from '@ember/service';

export default class StripeTokenAdapter extends RESTAdapter {
  @service
  stripe;
}
