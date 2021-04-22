import ApplicationAdapter from './application';
import { assert } from '@ember/debug';
import { isPresent } from '@ember/utils;

export default class StripePersonAdapter extends ApplicationAdapter {
  urlForCreateRecord (modelName, snapshot) {
    return `${this.urlForAccount (snapshot)}/${this.pathForType (modelName)}`;
  }

  urlForFindRecord (id, modelName, snapshot) {
    return `${this.urlForAccount (snapshot)}/${this.pathForType (modelName)}/${id}`;
  }

  urlForUpdateRecord (id, modelName, snapshot) {
    return `${this.urlForAccount (snapshot)}/${this.pathForType (modelName)}/${id}`;
  }

  urlForDeleteRecord (id, modelName, snapshot) {
    return `${this.urlForAccount (snapshot)}/${this.pathForType (modelName)}/${id}`;
  }

  urlForQuery (query, modelName) {
    return `${this.urlForAccount (snapshot)}/${this.pathForType (modelName)}`;
  }

  urlForFindAll (modelName, snapshot) {
    return `${this.urlForAccount (snapshot)}/${this.pathForType (modelName)}`;
  }

  urlForQueryRecord (query, modelName) {
    return `${this.urlForAccount (snapshot)}/${this.pathForType (modelName)}`;
  }

  urlForAccount (snapshot) {
    let { adapterOptions } = snapshot;
    let { account } = adapterOptions;

    assert ('You must pass an stripe-account model as <account> in the adapter options', isPresent (account));

    let adapter = account.store.adapterFor (account.constructor.modelName);
    return adapter.urlForFindRecord (account.id,  account.constructor.modelName, account);
  }
}
