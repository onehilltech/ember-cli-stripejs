/* eslint-env node */

const { Blueprint } = require ('ember-cli-blueprint-helpers');

module.exports = Blueprint.extend ({
  addons: [
    { name: '@ember/render-modifiers' },
    { name: 'ember-api-actions' },
    { name: 'ember-blueprint-data' },
    { name: 'ember-data-model-fragments', target: '5.0.0-beta.1' },
  ]
});
