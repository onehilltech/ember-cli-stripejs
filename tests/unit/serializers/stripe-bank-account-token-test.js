import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Serializer | stripe bank account token', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let store = this.owner.lookup('service:store');
    let serializer = store.serializerFor('stripe-bank-account-token');

    assert.ok(serializer);
  });

  test('it serializes records', function(assert) {
    let store = this.owner.lookup('service:store');
    let record = store.createRecord('stripe-bank-account-token', {});

    let serializedRecord = record.serialize();

    assert.ok(serializedRecord);
  });
});
