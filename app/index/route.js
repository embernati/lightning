import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  model() {
    return this.get('store').find('topic');
  },
  actions: {
    createNewTopic() {
      this.get('store').createRecord('topic', {
        description: this.get('controller.newTopic'),
        submittedBy: this.get('session.currentUser'),
        submittedDate: new Date()
      }).save();
      this.set('controller.newTopic', '');
    }
  }
});
