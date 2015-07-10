import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  newTopic: '',
  topicSort: ['upvoteCount:desc', 'volunteerCount:desc'],
  orderedTopics: Ember.computed.sort('model', 'topicSort'),
  actions: {
    newTopicUpdated(val) {
      this.set('newTopic', val);
    }
  }
});
