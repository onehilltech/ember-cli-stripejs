import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from "@glimmer/tracking";

function noOp () { }

export default class StripeBankAccountComponent extends Component {
  @service
  stripe;

  @tracked
  valid;

  @tracked
  routingNumber;

  @tracked
  accountNumber;

  @tracked
  accountHolderName;

  @tracked
  accountHolderType;

  setAccountHolderType (accountHolderType) {
    this.accountHolderType = accountHolderType;
  }

  get accountHolderTypeOptions () {
    return [
      { value: 'individual', text: 'Individual'},
      { value: 'company', text: 'company' }
    ]
  }

  get submitButtonDisabled () {
    return !this.valid;
  }

  get submitButtonLabel () {
    return this.args.submitButtonLabel || 'Submit';
  }

  @action
  submit () {
    const data = {
      country: 'US',
      currency: 'usd',
      routing_number: this.routingNumber,
      account_number: this.accountNumber,
      account_holder_name: this.accountHolderName,
      account_holder_type: this.accountHolderType.value
    }

    this.stripe.createToken ('bank_account', data).then (token => this.created (token));
  }

  @action
  validity (valid) {
    this.valid = valid;
  }

  get created () {
    return this.args.created || noOp;
  }
}
