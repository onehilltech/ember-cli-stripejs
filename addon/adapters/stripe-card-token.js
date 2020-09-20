import StripeTokenAdapter from "./stripe-token";
import { InvalidError } from '@ember-data/adapter';
import { isPresent } from '@ember/utils';

export default class StripeCardTokenAdapter extends StripeTokenAdapter {
  createRecord (store, type, snapshot) {
    let serializer = store.serializerFor (type.modelName);
    let data = serializer.serialize (snapshot);

    return this.stripe.createToken ('card', data)
      .then (response => this.handleResponse (200, null, response, data));
  }

  handleResponse (status, headers, payload) {
    if (status !== 402) {
      return super.handleResponse (...arguments);
    }

    let error = this.handleErrorResponse (payload);
    return isPresent (error) ? error : super.handleResponse (...arguments);
  }

  handleErrorResponse (payload) {
    if (payload.error.type !== 'card_error') {
      return null;
    }

    switch (payload.error.code) {
      case 'incorrect_number':
      case 'invalid_number':
      case 'card_declined':
        return new InvalidError ([
          {
            detail: payload.error.message,
            source: { pointer: '/data/attributes/number' }
          }
        ]);

      case 'invalid_cvc':
      case 'incorrect_cvc':
        return new InvalidError ([
          {
            detail: payload.error.message,
            source: { pointer: '/data/attributes/cvc' }
          }
        ]);

      case 'invalid_expiry_month':
        return new InvalidError ([
          {
            detail: payload.error.message,
            source: { pointer: '/data/attributes/exp_month' }
          }
        ]);

      case 'invalid_expiry_year':
        return new InvalidError ([
          {
            detail: payload.error.message,
            source: { pointer: '/data/attributes/exp_year' }
          }
        ]);

      case 'incorrect_zip':
        return new InvalidError ([
          {
            detail: payload.error.message,
            source: { pointer: '/data/attributes/address_zip' }
          }
        ]);
    }
  }
}
