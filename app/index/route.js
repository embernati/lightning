import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  model() {
    return this.get('store').findAll('topic');
  },
  actions: {
    createNewTopic() {
      this.get('store').createRecord('topic', {
        description: this.get('controller.newTopic'),
        submittedDate: new Date()
      }).save();
      this.set('controller.newTopic', '');
    },
    updateTopic(topic) {
      topic.save();
    }
  }
});
