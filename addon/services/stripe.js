/* global Stripe */

import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { get, getWithDefault } from '@ember/object';
import { inject as service } from '@ember/service';

export default class StripeService extends Service {
  @service
  store;

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
    return this._stripe.confirmCardPayment (clientSecret, data, options)
      .then (payload => {
        // Transform the payload into a stripe payment intent object.
        let modelClass = this.store.modelFor ('stripe-payment-intent');
        let serializer = this.store.serializerFor ('stripe-payment-intent');
        let data = serializer.normalizeSaveResponse (this.store, modelClass, payload);

        return this.store.push (data)
      });
  }
}
