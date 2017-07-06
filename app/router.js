import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('channels', { path: '/' }, function() {
    this.route('list', { path: '/' });
    this.route('details', { path: '/channels/:channelId' });
  });
});

export default Router;
