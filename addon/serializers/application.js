import RESTSerializer from '@ember-data/serializer/rest';
import MongoDB from 'ember-blueprint-data/mixins/serializers/mongodb';

export default RESTSerializer.extend (MongoDB, {
  primaryKey: 'id'
});
