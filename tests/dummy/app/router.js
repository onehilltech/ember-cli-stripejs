import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

<<<<<<< HEAD
Router.map(function() {
  this.route('elements', function() {
    this.route('card');
  });
  this.route('custom');
});
=======
Router.map(function () {});
>>>>>>> 4004368 (v3.16.2...v3.28.6)
