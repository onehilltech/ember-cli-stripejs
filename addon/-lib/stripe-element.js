import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { isPresent } from '@ember/utils';

function noOp () {

}

export default class StripeElementComponent extends Component {
  @service
  stripe;

  @tracked
  errorMessage;

  _element = null;
  _didChangeListener;

  constructor () {
    super (...arguments);

    this._didChangeListener = this.didChange.bind (this);
  }

  _createElement (type, options) {
    this._element = this.stripe.createElement (type, options);
    this._element.on ('change', this._didChangeListener);

    return this._element;
  }

  didChange (ev) {
    this.errorMessage = isPresent (ev.error) ? ev.error.message : undefined;

    this.change (ev);
  }

  get change () {
    return this.args.change || noOp;
  }
}