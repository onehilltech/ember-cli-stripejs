/* global Stripe */

import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { get, getWithDefault } from '@ember/object';

export default class StripeService extends Service {
  init () {
    super.init (...arguments);

    this._stripe = new Stripe (this.publishableKey, {
      apiVersion: this.apiVersion
    });
  }

  get publishableKey () {
    const ENV = getOwner (this).resolveRegistration ('config:environment');
    return get (ENV, 'stripe.publishableKey');
  }

  get apiVersion () {
    const ENV = getOwner (this).resolveRegistration ('config:environment');
    return getWithDefault (ENV, 'stripe.version');
  }

  createElement (type, options) {
    return this._stripe.elements ().create (type, options);
  }

  createToken (type, options) {
    return this._stripe.createToken (type, options);
  }

  createPaymentMethod (options) {
    return this._stripe.createPaymentMethod (options);
  }

  confirmCardPayment (clientSecret, data, options) {
    return this._stripe.confirmCardPayment (clientSecret, data, options);
  }
}
