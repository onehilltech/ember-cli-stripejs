import ApplicationAdapter from './application';
import { isPresent } from '@ember/utils';

export default class StripeAccountAdapter extends ApplicationAdapter {
  urlForFindRecord(id, modelName, snapshot) {
    let { adapterOptions = {} } = snapshot;
    let { baseModel, path = 'account' } = adapterOptions;

    if (isPresent(baseModel)) {
      return this._computeUrlFromBaseRecord(baseModel, path);
    } else {
      return super.urlForFindRecord(...arguments);
    }
  }

  urlForUpdateRecord(id, modelName, snapshot) {
    let { adapterOptions = {} } = snapshot;
    let { baseModel, path = 'account' } = adapterOptions;

    if (isPresent(baseModel)) {
      return this._computeUrlFromBaseRecord(baseModel, path);
    } else {
      return super.urlForFindRecord(...arguments);
    }
  }

  urlForDeleteRecord(id, modelName, snapshot) {
    let { adapterOptions = {} } = snapshot;
    let { baseModel, path = 'account' } = adapterOptions;

    if (isPresent(baseModel)) {
      return this._computeUrlFromBaseRecord(baseModel, path);
    } else {
      return super.urlForFindRecord(...arguments);
    }
  }

  _computeUrlFromBaseRecord(baseModel, path) {
    let adapter = baseModel.store.adapterFor(baseModel.constructor.modelName);
    let url = adapter.urlForFindRecord(
      baseModel.id,
      baseModel.constructor.modelName,
      baseModel
    );

    return `${url}/${path}`;
  }
}
