import Ember from 'ember';

export default Ember.Component.extend({
  topic: null,

  session: Ember.inject.service(),
  meetupDates: Ember.inject.service(),

  isNew: Ember.computed('topic.submittedDate', 'meetupDates.previousMeetup', function() {
    var submittedDate = moment(this.get('topic.submittedDate'));
    var endOfPreviousMeetup = moment(this.get('meetupDates.previousMeetup')).endOf('day');
    return submittedDate.isAfter(endOfPreviousMeetup);
  }),
  isUpvoter: Ember.computed('session.currentUser', 'topic.upvoters.[]', function isUpvoter() {
    return this.get('topic.upvoters').contains(this.get('session.currentUser'));
  }),
  isVolunteer: Ember.computed('session.currentUser', 'topic.volunteers.[]', function isVolunteer() {
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
