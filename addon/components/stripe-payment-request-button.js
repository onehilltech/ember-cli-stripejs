import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class StripePaymentRequestButtonComponent extends Component {
  @service
  stripe;

  @action
  async didInsert (element) {
    const button = await this.stripe.create ('paymentRequestButton', this.options);

    this.paymentRequest.on ('paymentmethod', this.didPaymentMethod.bind (this));

    const result = await this.paymentRequest.canMakePayment ();

    if (result) {
      button.mount (element);
    }
  }

  get options () {
    return {
      paymentRequest: this.paymentRequest
    }
  }

  get paymentRequest () {
    return this.args.paymentRequest;
  }

  get clientSecret () {
    return this.args.clientSecret;
  }

  didPaymentMethod (ev) {
    const data = { payment_method: ev.paymentMethod.id };

    this.stripe.confirmCardPayment (this.clientSecret, data, this.confirmOptions).then (result => {

    });
  }

  get confirmOptions () {
    return { handleActions: false };
  }
}
