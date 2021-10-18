/* global Stripe, cordova */

import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';

function hasCordovaPlugin () {
  return isPresent (window.cordova) && isPresent (window.cordova.plugins) && isPresent (window.cordova.plugins.stripe);
}

export default class StripeService extends Service {
  @service
  store;

  constructor () {
    super (...arguments);

    const { version, publishableKey } = this.config;
    this.configure (publishableKey, { apiVersion: version });
  }

  configure (publishableKey, options = this.defaultOptions) {
    // Configure the stripe.js api.
    this._stripe = new Stripe (publishableKey, options);

    // There is a chance that we have installed the cordova plugin because we are running
    // in the CORBER application. If that is the case, then we need to configure the publishable
    // key for the Stripe under this plugin.

    if (hasCordovaPlugin ()) {
      cordova.plugins.stripe.setPublishableKey (publishableKey);
    }
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
    if (type === 'bank_account' && hasCordovaPlugin ()) {
      return new Promise ((resolve, reject) => {
        function success (token) {
          resolve ({ token });
        }

        function failure (error) {
          resolve ({ error });
        }

        cordova.plugins.stripe.createBankAccountToken (options, success, failure);
      });
    }
    else {
      return this._stripe.createToken (type, options);
    }
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
