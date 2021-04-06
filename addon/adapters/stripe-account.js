import ApplicationAdapter from './application';
import { isPresent } from '@ember/utils';

export default class StripeAccountAdapter extends ApplicationAdapter {
  urlForFindRecord (id, modelName, snapshot) {
    let { adapterOptions } = snapshot;
    let { baseModel, path = 'merchant' } = adapterOptions;

    if (isPresent (baseModel)) {
      let adapter = baseModel.store.adapterFor (baseModel.constructor.modelName);
      let url = adapter.urlForFindRecord (baseModel.id,  baseModel.constructor.modelName, baseModel);

      return `${url}/${path}`;
    }
    else {
      return super.urlForFindRecord (...arguments);
    }
  }
}
