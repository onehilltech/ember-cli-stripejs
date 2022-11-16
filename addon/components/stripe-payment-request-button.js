import Component from '@glimmer/component';

import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from "@glimmer/tracking";

export default class StripePaymentRequestButtonComponent extends Component {
  @service
  stripe;

  @tracked
  paymentRequest;

  @tracked
  paymentRequestButton;

  @tracked
  mountable;

  @action
  async didInsert (element) {
    this.paymentRequest = await this.stripe.paymentRequest (this.options);
    this.paymentRequest.on ('paymentmethod', this.handlePaymentMethod.bind (this));

    this.paymentRequestButton = await this.stripe.createElement ('paymentRequestButton', { paymentRequest: this.paymentRequest });
    this.mountable = await this.paymentRequest.canMakePayment ();

    if (this.mountable) {
      this.paymentRequestButton.mount (element);
    }
  }

  get options () {
    return Object.assign ({}, this.args.options, {
      country: 'US',
      currency: 'usd',
      total: {
        label: this.args.label,
        amount: this.args.amount
      }
    });
  }

  get clientSecret () {
    return this.args.clientSecret;
  }

  async handlePaymentMethod (ev) {
    const { paymentMethod } = ev;

    // Confirm the PaymentIntent without handling potential next actions (yet).
    const { paymentIntent, error: confirmError } =
      await this.stripe.confirmCardPayment (
        this.clientSecret,
        {payment_method: paymentMethod.id},
        this.confirmOptions);

    if (confirmError) {
      // Report to the browser that the payment failed, prompting it to
      // re-show the payment interface, or show an error message and close
      // the payment interface.
      ev.complete('fail');
    }
    else {
      // Report to the browser that the confirmation was successful, prompting
      // it to close the browser payment method collection interface.
      ev.complete('success');
      // Check if the PaymentIntent requires any actions and if so let Stripe.js
      // handle the flow. If using an API version older than "2019-02-11"
      // instead check for: `paymentIntent.status === "requires_source_action"`.
      if (paymentIntent.status === "requires_action") {
        // Let Stripe.js handle the rest of the payment flow.
        const {error} = await stripe.confirmCardPayment(clientSecret);
        if (error) {
          // The payment failed -- ask your customer for a new payment method.
        } else {
          // The payment has succeeded.
        }
      } else {
        // The payment has succeeded.
      }
    }
  }

  get confirmOptions () {
    return { handleActions: false };
  }
}
