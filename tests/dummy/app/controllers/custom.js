import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class CustomController extends Controller {
  @tracked
  accountNumber;

  @tracked
  routingNumber;

  @tracked
  bankAccountToken;

  @action
  saveBankAccount (ev) {
    ev.preventDefault ();

    this.bankAccountToken = this.store.createRecord ('stripe-bank-account-token', {
      accountNumber: this.accountNumber,
      routingNumber: this.routingNumber,
      country: 'US'
    });

    this.bankAccountToken.save ();
  }
}
