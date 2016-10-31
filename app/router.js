import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('signup');
  this.route('journals');
  this.route('create-contract');
  this.route('view-contract');
  this.route('list-contracts');
});

export default Router;
