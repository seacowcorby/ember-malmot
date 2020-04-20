import AddonDocsRouter, { docsRoute } from 'ember-cli-addon-docs/router';
import config from './config/environment';

const Router = AddonDocsRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,
});

Router.map(function() {
  docsRoute(this, function() {
    this.route('usage');
    this.route('malmotsvg');
    this.route('malmotline');
    this.route('malmotcircle');
    this.route('malmotsquare');
    this.route('malmotrectangle');
  });

});

export default Router;
