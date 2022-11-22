import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from "@glimmer/tracking";
import { isNone, isPresent } from '@ember/utils';

export default class StripePaymentRequestButtonComponent extends Component {
  @service
  store;

  @service
  stripe;

  @tracked
  button;

  @tracked
  paymentRequest;

  element;

  @action
  async didInsert (element) {
    this.element = element;

    // First, let's create a payment request object. The payment request will be passed
    // to the mounted payment request button.
    const { label, amount } = this.args;

    if (amount > 0) {
      await this.createPaymentRequest ();
    }
  }

  willDestroy () {
    super.willDestroy ();

    if (isPresent (this.button)) {
      this.button.unmount ();

      this.paymentRequest = null;
      this.button = null;
    }
  }

  async createPaymentRequest () {
    const { label, amount } = this.args;

    this.paymentRequest = await this.stripe.createPaymentRequest ({
      country: 'US',
      currency: 'usd',
      total: { label, amount },
      requestPayerName: this.args.requestPayerName,
      requestPayerEmail: this.args.requestPayerEmail,
    });

    this.paymentRequest.on ('paymentmethod', this.paymentMethod.bind (this));
    this.paymentRequest.on ('cancel', () => (this.args.cancel || function () {}) ());

    this.button = await this.stripe.createElement ('paymentRequestButton', {
      paymentRequest: this.paymentRequest,
      style: {
        paymentRequestButton: this.style
      }
    });
    const result = await this.paymentRequest.canMakePayment ();

    if (result) {
      this.button.mount (this.element);
    }
  }

  get style () {
    return {
      type: this.args.type || 'default',
      theme: this.args.theme || 'dark',
      height: this.args.height || '40px'
    }
  }

  @action
  async updatePaymentRequest (element, [amount, label]) {
    if (amount > 0) {
      if (isNone (this.paymentRequest)) {
        await this.createPaymentRequest ();
      }
      else {
        this.paymentRequest.update ({
          total: { amount, label }
        });
      }
    }
    else {
      // Unmount the button since there is no amount.
      this.button.unmount ();

      this.paymentRequest = null;
      this.button = null;
    }
  }

  async paymentMethod (ev) {
    const { paymentMethod: payload } = ev;

    // Transform the payload into a stripe payment intent object.
    const modelClass = this.store.modelFor ('stripe-payment-method');
    const serializer = this.store.serializerFor ('stripe-payment-method');
    const data = serializer.normalizeSaveResponse (this.store, modelClass, { 'stripe-payment-method': payload });
    const paymentMethod = this.store.push (data);

    this.args.paymentMethod (paymentMethod, ev);
  }
}
