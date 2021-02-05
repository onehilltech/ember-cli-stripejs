import ApplicationAdapter from './application';

export default class StripePersonAdapter extends ApplicationAdapter {
  urlForCreateRecord (modelName, snapshot) {
    let { adapterOptions } = snapshot;
    let { merchant } = adapterOptions;

    let adapter = merchant.store.adapterFor (merchant.constructor.modelName);
    let url = adapter.urlForFindRecord (merchant.id,  merchant.constructor.modelName, merchant);

    return `${url}/representatives`;
  }

  urlForUpdateRecord (id, modelName, snapshot) {
    let { adapterOptions } = snapshot;
    let { merchant } = adapterOptions;

    let adapter = merchant.store.adapterFor (merchant.constructor.modelName);
    let url = adapter.urlForFindRecord (merchant.id,  merchant.constructor.modelName, merchant);

    return `${url}/representatives/${id}`;
  }

  urlForDeleteRecord (id, modelName, snapshot) {
    let { adapterOptions } = snapshot;
    let { merchant } = adapterOptions;

    let adapter = merchant.store.adapterFor (merchant.constructor.modelName);
    let url = adapter.urlForFindRecord (merchant.id,  merchant.constructor.modelName, merchant);

    return `${url}/representatives/${id}`;
  }
}
