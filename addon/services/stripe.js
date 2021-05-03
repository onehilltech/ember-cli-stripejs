/* global Stripe */

import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default class StripeService extends Service {
  @service
  store;

  constructor () {
    super (...arguments);

    const { version, publishableKey } = this.config;
    this.configure (publishableKey, { apiVersion: version });
  }

  configure (publishableKey, options = this.defaultOptions) {
    this._stripe = new Stripe (publishableKey, options);
  }

  get config () {
    return getOwner (this).resolveRegistration ('config:environment').stripe;
  }

  get defaultPublishableKey () {
    return get (this.config, 'publishableKey');
  }

  get defaultApiVersion () {
    return get (this.config, 'version');
  }

  get defaultOptions () {
    return {
      apiVersion: this.defaultApiVersion
    }
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

  confirmCardSetup (clientSecret, data, options) {
    return this._stripe.confirmCardSetup (clientSecret, data, options)
      .then (payload => {
        // Transform the payload into a stripe payment intent object.
        let modelClass = this.store.modelFor ('stripe-setup-intent');
        let serializer = this.store.serializerFor ('stripe-setup-intent');
        let data = serializer.normalizeSaveResponse (this.store, modelClass, payload);

        return this.store.push (data)
      });
  }

  /**
   * Create a payment requests objects for Apple Pay or the standard payment request
   * API.
   *
   * @param options
   * @returns {*}
   */
  paymentRequest (options) {
    return this._stripe.paymentRequest (options);
  }
}
