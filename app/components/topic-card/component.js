import Ember from 'ember';

export default Ember.Component.extend({
  topic: null,
  showMeetupDates: false,

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
  talkByCurrentUser: Ember.computed('session.currentUser', 'topic.talkBy', function() {
    return this.get('session.currentUser.username') === this.get('topic.talkBy.username');
  }),
  today: Ember.computed(function today() {
    return moment().startOf('day').toDate();
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
    chooseTalkDate(date) {
      // we don't currently have a date and the meetup is today.
      // let them choose a date.
      if (!date && this.get('meetupDates.isMeetupToday')) {
        return this.toggleProperty('showMeetupDates');
      }

      if (!date && !this.get('meetupDates.isMeetupToday')) {
        date = this.get('meetupDates.nextMeetup');
      }

      this.get('topic').setProperties({
        talkBy: this.get('session.currentUser'),
        talkDate: date
      });

      this.set('showMeetupDates', false);

      this.get('topic').save();
    },
    cancelTalkBy() {
      this.get('topic').setProperties({ talkBy: null, talkDate: null });
      this.get('topic').save();
    }
  }
});
