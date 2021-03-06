import ApplicationAdapter from './application';
import { inject as service } from '@ember/service';

export default class StripeTokenAdapter extends ApplicationAdapter {
  @service
  stripe;
}
