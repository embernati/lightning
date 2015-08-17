import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),

  upvoters: DS.hasMany('user', { async: true }),
  volunteers: DS.hasMany('user', { async: true }),

  submittedDate: DS.attr('date'),

  talkDate: DS.attr('date'),
  talkBy: DS.belongsTo('user', { async: true }),

  upvoteCount: Ember.computed.readOnly('upvoters.length'),
  volunteerCount: Ember.computed.readOnly('volunteers.length')
});
