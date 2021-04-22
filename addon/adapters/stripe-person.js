import ApplicationAdapter from './application';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils';

export default class StripePersonAdapter extends ApplicationAdapter {
  pathForType () {
    return 'persons';
  }

  urlForCreateRecord (modelName, snapshot) {
    return `${this.urlFromSnapshot (snapshot)}/${this.pathForType (modelName)}`;
  }

  urlForFindRecord (id, modelName, snapshot) {
    return `${this.urlFromSnapshot (snapshot)}/${this.pathForType (modelName)}/${id}`;
  }

  urlForFindAll (modelName, snapshot) {
    return `${this.urlFromSnapshot (snapshot)}/${this.pathForType (modelName)}`;
  }

  urlForUpdateRecord (id, modelName, snapshot) {
    let account = snapshot.belongsTo ('account');
    return `${this.urlFromAccount (account, account.modelName)}/${this.pathForType (modelName)}/${id}`;
  }

  urlForDeleteRecord (id, modelName, snapshot) {
    let account = snapshot.belongsTo ('account');
    return `${this.urlFromAccount (account, account.modelName)}/${this.pathForType (modelName)}/${id}`;
  }

  urlFromSnapshot (snapshot) {
    let { adapterOptions } = snapshot;
    let { account } = adapterOptions;

    assert ('You must pass an stripe-account model as <account> in the adapter options', isPresent (account));

    return this.urlFromAccount (account, account.constructor.modelName);
  }

  urlFromAccount (account, modelName) {
    let adapter = this.store.adapterFor (modelName);
    return adapter.urlForFindRecord (account.id,  modelName, account);
  }
}
