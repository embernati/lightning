import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  description: DS.attr('string'),

  upvoters: DS.hasMany('user', { async: true }),
  volunteers: DS.hasMany('user', { async: true }),

  submittedBy: DS.belongsTo('user', { async: true }),
  submittedDate: DS.attr('date'),

  upvoteCount: Ember.computed.readOnly('upvoters.length'),
  volunteerCount: Ember.computed.readOnly('volunteers.length')
});
