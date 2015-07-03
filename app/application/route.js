import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  actions: {
    signin() {
      this.get('session').authenticate().then(function() {
        window.location.reload();
      });
    },
    signout() {
      this.get('session').invalidate();
      window.location.reload();
    }
  }
});
