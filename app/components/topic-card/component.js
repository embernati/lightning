import Ember from 'ember';

export default Ember.Component.extend({
  topic: null,

  session: Ember.inject.service(),

  isUpvoter: Ember.computed('topic.upvoters.[]', function isUpvoter() {
    return this.get('topic.upvoters').contains(this.get('session.currentUser'));
  }),
  isVolunteer: Ember.computed('topic.volunteers.[]', function isVolunteer() {
    return this.get('topic.volunteers').contains(this.get('session.currentUser'));
  }),

  actions: {
    upvote() {
      if(this.get('isUpvoter')) {
        this.get('topic.upvoters').removeObject(this.get('session.currentUser'));
      }
      else {
        this.get('topic.upvoters').pushObject(this.get('session.currentUser'));
      }
      this.get('topic').save();
    },
    volunteer() {
      if(this.get('isVolunteer')) {
        this.get('topic.volunteers').removeObject(this.get('session.currentUser'));
      }
      else {
        this.get('topic.volunteers').pushObject(this.get('session.currentUser'));
      }
      this.get('topic').save();
    }
  }
});
