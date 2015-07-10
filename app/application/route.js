import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  beforeModel() {
    if(this.get('session.isAuthenticated')) {
      return this.get('session').loadCurrentUser();
    }
  },
  actions: {
    signin() {
      this.get('session').authenticate();
    },
    signout() {
      this.transitionTo('signout');
    }
  }
});
