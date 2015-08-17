import Ember from 'ember';

// 3rd wednesday
var MEETUP_WEEK = 2; // 3rd week of the month (0 based)
var MEETUP_WEEKDAY = 3; // Wednesday (0 based starting with Sunday)

function getMeetupMomentByMonthOffset(offset) {
  var firstDayOfMonth = moment().add(offset, 'months').startOf('month');
  var dateOfFirstMeetupWeekday = ((7 + MEETUP_WEEKDAY - firstDayOfMonth.day()) % 7) + 1;
  return firstDayOfMonth.date(dateOfFirstMeetupWeekday).add((MEETUP_WEEK), 'weeks');
}

export default Ember.Service.extend({
  isMeetupToday: Ember.computed(function() {
    var today = moment().startOf('day');
    return getMeetupMomentByMonthOffset(0).isSame(today);
  }),
  previousMeetup: Ember.computed(function() {
    var today = moment().startOf('day');
    var thisMonthsMeetup = getMeetupMomentByMonthOffset(0);
    var previousMeetup = thisMonthsMeetup.isBefore(today) ? thisMonthsMeetup : getMeetupMomentByMonthOffset(-1);
    return previousMeetup.toDate();
  }),
  nextMeetup: Ember.computed(function() {
    var today = moment().startOf('day');
    var thisMonthsMeetup = getMeetupMomentByMonthOffset(0);
    var nextMeetup = thisMonthsMeetup.isAfter(today) ? thisMonthsMeetup : getMeetupMomentByMonthOffset(1);
    return nextMeetup.toDate();
  })
});
