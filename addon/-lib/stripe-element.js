import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isPresent } from '@ember/utils';
import { action, getWithDefault } from '@ember/object';

function noOp () { }

const BUILTIN_EVENT_HANDLERS = [
  { event: 'change', method: 'didChange', handler: null },
  { event: 'ready', method: 'didReady', handler: null },
  { event: 'focus', method: 'didFocus', handler: null },
  { event: 'blur', method: 'didBlur', handler: null },
  { event: 'click', method: 'didClick', handler: null },
  { event: 'escape', method: 'didEscape', handler: null },
];

export default class StripeElementComponent extends Component {
  @service
  stripe;

  @service
  store;

  @tracked
  errorMessage;

  _element = null;
  _elementHandlers = null;

  constructor () {
    super (...arguments);

    this._elementHandlers = BUILTIN_EVENT_HANDLERS.map (eventHandler => Object.assign ({}, eventHandler, { handler: this[eventHandler.method].bind (this)}));
  }

  willDestroy () {
    super.willDestroy ();

    // Destroy the element.
    if (isPresent (this._element)) {
      this._element.destroy ();
    }
  }

  async createElement (type, options) {
    this._element = await this.stripe.createElement (type, options);
    this._elementHandlers.forEach (elementHandler => this._element.on (elementHandler.event, elementHandler.handler));

    return this._element;
  }

  @action
  clear (target, [clear]) {
    if (clear) {
      this._element.clear ();
    }
  }

  @action
  async createToken (element, [create]) {
    if (create) {
      const token = await this._createToken ();

      // Transform the token into a model.
      const data = this.serializeToken (this.store, token);
      const model = this.store.push (data);

      // Notify the parent that we have created a token from the model.
      getWithDefault (this, 'args.token.callback', noOp) (model);
    }
  }

  @action
  async createPaymentMethod (element, [create]) {
    if (create) {
      const options = { billing_details: this.billingDetails };
      const paymentMethod = await this._createPaymentMethod (this.paymentMethodType, options);

      // Transform the token into a model.
      const data = this.serializePaymentMethod (this.store, paymentMethod);
      const model = this.store.push (data);

      // Notify the parent that we have created a token from the model.
      getWithDefault (this, 'args.paymentMethod.callback', noOp) (model);
    }
  }

  @action
  update (element, [name, value]) {
    if (isPresent (this._element)) {
      this._element.update ({[name]: value});
    }
  }

  get billingDetails () {
    return this.args.billingDetails || {};
  }

  serializeToken (store, token) {
    return token;
  }

  serializePaymentMethod (store, paymentMethod) {
    const modelClass = store.modelFor ('stripe-payment-method');
    const serializer = store.serializerFor ('stripe-payment-method');
    return serializer.normalizeSaveResponse (this.store, modelClass, paymentMethod);
  }

  async _createToken (data) {
    return this.stripe.createToken (this._element, data || this.data);
  }

  async _createPaymentMethod (type, options = {}) {
    return this.stripe.createPaymentMethod (Object.assign ({}, options, { type, card: this._element }));
  }

  get data () {
    return undefined;
  }

  _dispatchEvent (name, ev) {
    (this.args[name] || noOp) (ev);
  }

  didChange (ev) {
    this.errorMessage = isPresent (ev.error) ? ev.error.message : undefined;
    this._dispatchEvent ('change', ev);
  }

  didReady (ev) {
    this._dispatchEvent ('ready', ev);
  }

  didFocus (ev) {
    this._dispatchEvent ('focus', ev);
  }

  didBlur (ev) {
    this._dispatchEvent ('blur', ev);
  }

  didClick (ev) {
    this._dispatchEvent ('click', ev);
  }

  didEscape (ev) {
    this._dispatchEvent ('escape', ev);
  }
}
