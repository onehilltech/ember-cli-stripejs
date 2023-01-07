import Service from '@ember/service';
import { getOwner } from '@ember/application';
import { inject as service } from '@ember/service';
import { isPresent } from '@ember/utils';
import { loadStripe } from '@stripe/stripe-js';
import { tracked } from '@glimmer/tracking';

function hasCordovaPlugin() {
  return (
    isPresent(window.cordova) &&
    isPresent(window.cordova.plugins) &&
    isPresent(window.cordova.plugins.stripe)
  );
}

export default class StripeService extends Service {
  @service
  store;

  @tracked
  _developerMode;

  get config() {
    return getOwner(this).resolveRegistration('config:environment').stripe;
  }

  get defaultPublishableKey() {
    return this.config.publishableKey;
  }

  get defaultApiVersion() {
    return this.config.version;
  }

  get defaultOptions() {
    return {
      apiVersion: this.defaultApiVersion,
    };
  }

  set developerMode(developerMode) {
    if (this._developerMode === developerMode) {
      return;
    }

    // The developer mode has changed. We are going to reset the Stripe reference
    // just in case the user application supports developer mode.

    this._developerMode = developerMode;
    this._stripe = null;
  }

  get developerMode() {
    return this._developerMode;
  }

  /**
   * Create a Stripe element
   *
   * @param type          Type of element to create
   * @param options       Element options
   */
  async createElement(type, options) {
    const stripe = await this.getStripe();
    return stripe.elements().create(type, options);
  }

  /**
   * Create a token for sending payment information to the server.
   *
   * @param       type          Type of payment token to make
   * @param       options       The token options
   */
  async createToken(type, options) {
    if (type === 'bank_account' && hasCordovaPlugin()) {
      return new Promise((resolve) => {
        const success = (token) => resolve({ token });
        const failure = (error) => ({ error });

        window.cordova.plugins.stripe.createBankAccountToken(
          options,
          success,
          failure
        );
      });
    } else {
      const stripe = await this.getStripe();
      return stripe.createToken(type, options);
    }
  }

  /**
   * Create a payment method.
   *
   * @param options
   */
  async createPaymentMethod(options) {
    const stripe = await this.getStripe();
    return stripe.createPaymentMethod(options);
  }

  async createPaymentRequest(options) {
    const stripe = await this.getStripe();
    return stripe.paymentRequest(options);
  }

  /**
   * Save the payment method in the event as a model.
   * *
   * @param ev
   * @return {Promise<void>}
   */
  async savePaymentMethod (ev) {
    const { paymentMethod } = ev;
    const payload = { 'stripe-payment-method': paymentMethod };

    // Transform the payload into a stripe payment method object.
    const modelClass = this.store.modelFor('stripe-payment-method');
    const serializer = this.store.serializerFor('stripe-payment-method');
    const data = serializer.normalizeSaveResponse (this.store, modelClass, payload);

    return this.store.push (data);
  }

  /**
   * Confirm an existing card payment.
   *
   * @param clientSecret
   * @param payment
   * @param options
   */
  async confirmCardPayment(clientSecret, payment, options) {
    const stripe = await this.getStripe();
    const payload = await stripe.confirmCardPayment(
      clientSecret,
      payment,
      options
    );

    // Transform the payload into a stripe payment intent object.
    const modelClass = this.store.modelFor('stripe-payment-intent');
    const serializer = this.store.serializerFor('stripe-payment-intent');
    const data = serializer.normalizeSaveResponse(
      this.store,
      modelClass,
      payload
    );

    return this.store.push(data);
  }

  /**
   * Confirm the setup of a card.
   * *
   * @param clientSecret
   * @param payment
   * @param options
   */
  async confirmCardSetup(clientSecret, payment, options) {
    const stripe = await this.getStripe();
    const payload = await stripe.confirmCardSetup(
      clientSecret,
      payment,
      options
    );

    // Transform the payload into a stripe payment intent object.
    const modelClass = this.store.modelFor('stripe-setup-intent');
    const serializer = this.store.serializerFor('stripe-setup-intent');
    const data = serializer.normalizeSaveResponse(
      this.store,
      modelClass,
      payload
    );

    return this.store.push(data);
  }

  /**
   * Create a payment requests objects for Apple Pay or the standard payment request
   * API.
   *
   * @param options
   */
  async paymentRequest(options) {
    const stripe = await this.getStripe();
    return stripe.paymentRequest(options);
  }

  /**
   * Get a reference to the Stripe singleton instance.
   * *
   * @return {Promise<Stripe>}
   */
  async getStripe() {
    if (isPresent(this._stripe)) {
      return this._stripe;
    }

    let { publishableKey } = this.config;

    if (this._developerMode && this.config.developer) {
      const { developer: { publishableKey: key } } = this.config;

      if (isPresent (key)) {
        publishableKey = key;
      }
      else {
        console.warn ('You have enabled developer mode, but have not set the developer test key.');
        console.warn ('Using the production key instead of the developer test key.');
      }
    }

    this._stripe = await loadStripe(publishableKey);

    if (hasCordovaPlugin()) {
      window.cordova.plugins.stripe.setPublishableKey(publishableKey);
    }

    return this._stripe;
  }
}
