import Model, { attr, belongsTo } from '@ember-data/model';
import { fragment } from 'ember-data-model-fragments/attributes';
import { isPresent } from '@ember/utils';

export function makePerson (Base) {
  return class Person extends Base {
    @attr ('stripe-date')
    created;

    @belongsTo('stripe-account')
    account;

    @attr
    firstName;

    @attr
    lastName;

    set name (value) {
      if (isPresent (value)) {
        [this.firstName, this.lastName] = value.split (' ');
      }
      else {
        this.firstName = this.lastName = null;
      }
    }

    get name () {
      let parts = [];

      if (isPresent (this.firstName)) {
        parts.push (this.firstName);
      }

      if (isPresent (this.lastName)) {
        parts.push (this.lastName);
      }

      return parts.join (' ');
    }

    @attr
    email;

    @attr
    phone;

    @fragment('stripe-address')
    address;

    @fragment('stripe-dob')
    dob;

    @attr
    metadata;

    @fragment('stripe-requirements', { serialize: false })
    requirements;

    @fragment('stripe-relationship')
    relationship;

    @attr
    ssnLast4;

    @attr ({ serialize: false })
    ssnLast4Provided;

    @attr
    idNumber;

    @attr ('boolean')
    idNumberProvided;

    get isDue () {
      return isPresent (this.eventuallyDue) || isPresent (this.currentlyDue) || isPresent (this.pastDue);
    }

    get eventuallyDue () {
      return this._filterRequirements (this.get ('account.requirements.eventuallyDue'));
    }

    get currentlyDue () {
      return this._filterRequirements (this.get ('account.requirements.currentlyDue'));
    }

    get pastDue () {
      return this._filterRequirements (this.get ('account.requirements.pastDue'));
    }

    /**
     * Filter the requirements for this person from the list of requirements.
     *
     * @param requirements
     * @returns {*}
     * @private
     */
    _filterRequirements (requirements) {
      return requirements.reduce ((filtered, requirement) => {
        let [id, ...field] = requirement.split ('.');

        if (id === this.id) {
          filtered.push (field.join ('.'));
        }

        return filtered;
      }, []);
    }
  }
}

export default makePerson (Model);