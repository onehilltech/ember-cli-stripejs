import StripeElementComponent from "../-lib/stripe-element"
import { action } from '@ember/object';

export default class StripeCardElementComponent extends StripeElementComponent {
  @action
  didInsert (htmlElement) {
    let element = this._createElement ('card', this.options);
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
}

