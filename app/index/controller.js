import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  newTopic: '',
  topicSort: ['talkDate:desc', 'upvoteCount:desc'],
  activeTopics: Ember.computed('model.@each.talkDate', function() {
    var todayBeginning = moment().startOf('day');
    return this.get('model').filter(function(topic) {
      var talkDate = topic.get('talkDate');
      var talkDateBeginning = talkDate ? moment(talkDate).startOf('day') : null;
      return !talkDate || talkDateBeginning >= todayBeginning;
    });
  }),
  orderedTopics: Ember.computed.sort('activeTopics', 'topicSort'),
  actions: {
    newTopicUpdated(val) {
      this.set('newTopic', val);
    }
  }
});
