/* global Stripe */

import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { get, getWithDefault } from '@ember/object';
import { inject as service } from '@ember/service';

export default class StripeService extends Service {
  @service
  store;

  constructor () {
    super ();

    const { version, publishableKey } = this.config;
    this.configure (publishableKey, { apiVersion: version });
  }

  configure (publishableKey, options) {
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
}
