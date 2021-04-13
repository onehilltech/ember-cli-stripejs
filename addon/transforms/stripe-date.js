import Transform from '@ember-data/serializer/transform';
import { isPresent } from '@ember/utils';

export default class StripeDateTransform extends Transform {
  deserialize(serialized) {
    return new Date (serialized * 1000);
  }

  serialize(date) {
    return isPresent (date) ? date.getMilliseconds () / 1000 : date;
  }
}
