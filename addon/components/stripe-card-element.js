import StripeElementComponent from "../-lib/stripe-element"
import { action } from '@ember/object';

export default class StripeCardElementComponent extends StripeElementComponent {
  paymentMethodType = 'card';

  @action
  async didInsert (htmlElement) {
    const element = await this.createElement ('card', this.options);
    element.mount (htmlElement);
  }

  get options () {
    return this.args.options || this.optionsHash;
  }

  get optionsHash () {
    return {
      classes: this.args.classes,
      style: this.args.style,
      value: this.args.value,
      hidePostalCode: this.args.hidePostalCode,
      iconStyle: this.args.iconStyle,
      hideIcon: this.args.hideIcon,
      disabled: this.args.disabled
    }
  }

  serializeToken (store, token) {
    const modelClass = store.modelFor ('stripe-card-token');
    const serializer = store.serializerFor ('stripe-card-token');

    return serializer.normalizeSaveResponse (this.store, modelClass, token);
  }
}

