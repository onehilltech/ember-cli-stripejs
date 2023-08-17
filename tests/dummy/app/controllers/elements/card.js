import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ElementsCardController extends Controller {
  @tracked
  clear;

  @tracked
  create;

  @tracked
  createPaymentMethod;

  @tracked
  token;

  @tracked
  paymentMethod;

  @action
  change(card) {
    console.log(card);
  }

  @action
  doClear() {
    this.clear = true;
    this.token = null;
  }

  @action
  doCreateToken() {
    this.create = true;
  }

  @action
  doCreatePaymentMethod() {
    this.createPaymentMethod = true;
  }

  @action
  created(token) {
    this.token = token;
  }

  @action
  paymentMethodCreated(paymentMethod) {
    this.paymentMethod = paymentMethod;
  }
}
