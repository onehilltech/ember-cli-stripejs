import ApplicationSerializer from './application';
import { camelize } from '@ember/string';

export default class StripeTokenSerializer extends ApplicationSerializer {
  normalizeSaveResponse(store, primaryModelClass, payload) {
    const ignore = ['id', 'object', 'type'];
    const attributes = this._normalizePayloadAttributes(payload, ignore);
    const { modelName } = primaryModelClass;

    return {
      data: {
        type: modelName,
        id: payload.id,
        attributes,
      },
    };
  }

  _normalizePayloadAttributes(payload, ignore) {
    let attributes = {};
    let keys = Object.keys(payload);

    for (let i = 0, length = keys.length; i < length; ++i) {
      let key = keys[i];

      if (ignore.indexOf(key) !== -1) {
        continue;
      }

      let attributeKey = camelize(key);
      attributes[attributeKey] = payload[key];
    }

    return attributes;
  }
}
