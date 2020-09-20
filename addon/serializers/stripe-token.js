import RESTSerializer from '@ember-data/serializer/rest';
import { isPresent, isNone } from '@ember/utils';
import { underscore, camelize } from '@ember/string';

export default class StripeTokenSerializer extends RESTSerializer {
  primaryKey = 'id';

  keyForAttribute (key) {
    return underscore (key);
  }

  serializeAttribute (snapshot, json, key, attribute) {
    const { options = {} } = attribute;

    const changed = snapshot.changedAttributes ();

    if (isNone (changed[key])) {
      return;
    }

    // Check if the attribute is one that we never serialize in the request. If
    // we should not serialize the attribute, then we can just return.
    if (isPresent (options.serialize) && options.serialize === false) {
      return;
    }

    return super.serializeAttribute (snapshot, json, key, attribute);
  }

  normalizeSaveResponse (store, primaryModelClass, payload) {
    const ignore = ['id', 'object', 'type'];
    const attributes = this._normalizePayloadAttributes (payload, ignore);
    const { modelName } = primaryModelClass;

    return {
      data: {
        type: modelName,
        id: payload.id,
        attributes
      }
    };
  }

  _normalizePayloadAttributes (payload, ignore) {
    let attributes = {};
    let keys = Object.keys (payload);

    for (let i = 0, length = keys.length; i < length; ++ i) {
      let key = keys[i];

      if (ignore.indexOf (key) !== -1) {
        continue;
      }

      let attributeKey = camelize (key);
      attributes[attributeKey] = payload[key];
    }

    return attributes;
  }
}
