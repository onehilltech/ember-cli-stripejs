import Transform from '@ember-data/serializer/transform';

export default class StripeDateTransform extends Transform {
  deserialize(serialized) {
    return new Date (serialized * 1000);
  }

  serialize(date) {
    return date.getMilliseconds () / 1000;
  }
}
