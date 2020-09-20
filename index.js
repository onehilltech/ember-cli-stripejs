'use strict';

module.exports = {
  name: require('./package').name,

  contentFor (type) {
    this._super (...arguments);

    if (type === 'body') {
      return '<script type="text/javascript" src="https://js.stripe.com/v3/"></script>';
    }
  }
};
