import ApplicationSerializer from './application';
import { isPresent } from '@ember/utils';

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
        }
        break;

      default:
        super.serializeAttribute (...arguments);
    }
  }
}
