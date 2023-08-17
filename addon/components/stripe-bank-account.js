import Component from '@glimmer/component';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

function noOp() {}

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

  @action
  setAccountHolderType(accountHolderType) {
    this.accountHolderType = accountHolderType;
  }

  get accountHolderTypeOptions() {
    return [
      { value: 'individual', text: 'Individual' },
      { value: 'company', text: 'Company' },
    ];
  }

  get submitButtonDisabled() {
    return !this.valid;
  }

  get submitButtonLabel() {
    return this.args.submitButtonLabel || 'Submit';
  }

  @action
  async submit() {
    const data = {
      country: 'US',
      currency: 'usd',
      routing_number: this.routingNumber,
      account_number: this.accountNumber,
      account_holder_name: this.accountHolderName,
      account_holder_type: this.accountHolderType.value,
    };

    // Notify the client we are creating a token.
    this.creating();

    const { token } = await this.stripe.createToken('bank_account', data);

    // Notify the client we have created the token.
    this.created(token);
  }

  @action
  validity(valid) {
    this.valid = valid;
  }

  get creating() {
    return this.args.creating || noOp;
  }

  get created() {
    return this.args.created || noOp;
  }
}
