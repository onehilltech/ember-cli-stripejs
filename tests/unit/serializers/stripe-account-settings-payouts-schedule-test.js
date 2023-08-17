import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module(
  'Unit | Serializer | stripe account settings payouts schedule',
  function (hooks) {
    setupTest(hooks);

    // Replace this with your real tests.
    test('it exists', function (assert) {
      let store = this.owner.lookup('service:store');
      let serializer = store.serializerFor(
        'stripe-account-settings-payouts-schedule'
      );

      assert.ok(serializer);
    });

    test('it serializes records', function (assert) {
      let store = this.owner.lookup('service:store');
      let record = store.createRecord(
        'stripe-account-settings-payouts-schedule',
        {}
      );

      let serializedRecord = record.serialize();

      assert.ok(serializedRecord);
    });
  }
);
