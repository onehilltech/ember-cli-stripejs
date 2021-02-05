import StripeTokenSerializer from "./stripe-token";

export default class StripeBankAccountTokenSerializer extends StripeTokenSerializer {
  serializeIntoHash (hash, typeClass, snapshot) {
    hash.bank_account = {
      country: snapshot.attr ('country'),
      currency: snapshot.attr ('currency'),
      account_holder_name: snapshot.attr ('accountHolderName'),
      account_holder_type: snapshot.attr ('accountHolderType'),
      account_number: snapshot.attr ('accountNumber'),
      routing_number: snapshot.attr ('routingNumber')
    };

    return hash;
  }

  normalizeSaveResponse (store, primaryModelClass, payload) {
    const { token } = payload;

    const bankAccount = token.bank_account;
    delete token.bank_account;

    let hash = super.normalizeSaveResponse (store, primaryModelClass, token);

    const ignore = ['object', 'account_number'];

    let attributes = this._normalizePayloadAttributes (bankAccount, ignore);
    attributes.type = 'bank_account';

    Object.assign (hash.data.attributes, attributes);

    return hash;
  }
}
