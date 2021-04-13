import RESTSerializer from '@ember-data/serializer/rest';
import MongoDB from 'ember-blueprint-data/mixins/serializers/mongodb';
import { dasherize } from '@ember/string';

export default RESTSerializer.extend (MongoDB, {
  primaryKey: 'id',

  payloadKeyFromModelName (modelName) {
    return dasherize (modelName);
  }
});
