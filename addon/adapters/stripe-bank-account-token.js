import StripeTokenAdapter from "./stripe-token";
import { InvalidError } from '@ember-data/adapter';

export default class StripeBankAccountTokenAdapter extends StripeTokenAdapter {
  createRecord (store, type, snapshot) {
    let serializer = store.serializerFor (type.modelName);
    let data = serializer.serialize (snapshot);

    return this.stripe.createToken ('bank_account', data)
      .then (result => this.handleResponse (200, null, result, data));
  }

  handleResponse (status, headers, payload) {
    if (status === 200) {
      return super.handleResponse (...arguments);
    }

    switch (status) {
      case 400:
        if (payload.error) {
          if (payload.error.type === 'invalid_request_error') {
            switch (payload.error.code) {
              case 'account_number_invalid':
                return new InvalidError ([
                  {
                    detail: payload.error.message,
                    source: {pointer: '/data/attributes/account_number'}
                  }
                ]);

              case 'routing_number_invalid':
                return new InvalidError ([
                  {
                    detail: payload.error.message,
                    source: {pointer: '/data/attributes/routing_number'}
                  }
                ]);
            }
          }
        }

        break;
    }

    return super.handleResponse (...arguments);
  }
}
