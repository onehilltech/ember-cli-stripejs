/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  packages: [
    { name: 'ember-blueprint-data' }
  ],

  addons: [
    { name: '@ember/render-modifiers' },
    { name: 'ember-data-model-fragments', target: '5.0.0-beta.1' },
  ]
});
