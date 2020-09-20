import StripeTokenSerializer from "./stripe-token";

export default class StripeCardTokenSerializer extends StripeTokenSerializer {
  serializeIntoHash (hash, typeClass, snapshot) {
    hash.card = {
      number: snapshot.attr ('number'),
      cvc: snapshot.attr ('cvc'),
      exp_month: snapshot.attr ('expMonth'),
      exp_year: snapshot.attr ('expYear'),
      name: snapshot.attr ('name')
    };

    if (snapshot.attr ('addressZip')) {
      hash.card['address_zip'] = snapshot.attr ('addressZip');
    }

    return hash;
  }

  normalizeSaveResponse (store, primaryModelClass, payload) {
    const { token } = payload;

    const card = token.card;
    delete token.card;

    let hash = super.normalizeSaveResponse (store, primaryModelClass, token);

    const ignore = ['object', 'number'];

    let attributes = this._normalizePayloadAttributes (card, ignore);
    attributes.type = 'card';

    Object.assign (hash.data.attributes, attributes);

    return hash;
  }
}
