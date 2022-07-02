import ApplicationSerializer from './application';
import { isPresent, isNone } from '@ember/utils';

export default class StripeAccountSettingsPayoutsScheduleSerializer extends ApplicationSerializer {
  /**
   * Serialize an attribute.
   *
   * @param snapshot
   * @param json
   * @param key
   */
  serializeAttribute(snapshot, json, key) {
    switch (key) {
      case 'monthlyAnchor':
      case 'weeklyAnchor':
        if (isPresent (snapshot.attr (key))) {
          super.serializeAttribute (...arguments);

          // We are always going to serialize the interval as well.
          if (isNone (json['interval'])) {
            json['interval'] = snapshot.attr ('interval');
          }
        }
        break;

      default:
        super.serializeAttribute (...arguments);
    }
  }
}
