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

  urlForUpdateRecord (id, modelName, snapshot) {
    return `${this.urlFromAccount (snapshot.account)}/${this.pathForType (modelName)}/${id}`;
  }

  urlForDeleteRecord (id, modelName, snapshot) {
    return `${this.urlFromAccount (snapshot.account)}/${this.pathForType (modelName)}/${id}`;
  }

  urlForFindAll (modelName, snapshot) {
    return `${this.urlFromSnapshot (snapshot)}/${this.pathForType (modelName)}`;
  }

  urlFromSnapshot (snapshot) {
    let { adapterOptions } = snapshot;
    let { account } = adapterOptions;

    assert ('You must pass an stripe-account model as <account> in the adapter options', isPresent (account));

    return this.urlFromAccount (account);
  }

  urlFromAccount (account) {
    let adapter = account.store.adapterFor (account.constructor.modelName);
    return adapter.urlForFindRecord (account.id,  account.constructor.modelName, account);
  }
}
