import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  urlForCreateRecord (modelName, snapshot) {
    return this._urlForRecord (modelName, snapshot);
  },

  urlForDeleteRecord (id, modelName, snapshot) {
    return `${this._urlForRecord (modelName, snapshot)}/${id}`;
  },

  urlForUpdateRecord (id, modelName, snapshot) {
    return `${this._urlForRecord (modelName, snapshot)}/${id}`;
  },

  _urlForRecord (modelName, snapshot) {
    let { adapterOptions } = snapshot;
    let { merchant } = adapterOptions;

    let adapter = merchant.store.adapterFor (merchant.constructor.modelName);
    let url = adapter.urlForFindRecord (merchant.id,  merchant.constructor.modelName, merchant);

    return `${url}/external-accounts`;
  }
});
