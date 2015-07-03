import Ember from 'ember';
import config from 'lightning/config/environment';

export default Ember.Service.extend({
  firebase: Ember.computed(function() {
    return new Firebase(config.firebase);
  }),
  isAuthenticated: Ember.computed.notEmpty('authData'),
  username: Ember.computed.alias('authData.github.username'),
  avatar: Ember.computed.alias('authData.github.cachedUserProfile.avatar_url'),
  authData: Ember.computed({
    get() {
      return JSON.parse(localStorage.getItem('authData'));
    },
    set(key, value) {
      localStorage.setItem('authData', JSON.stringify(value));
    }
  }),
  authenticate() {
    return new Ember.RSVP.Promise((resolve, reject)=> {
      this.get('firebase').authWithOAuthPopup('github', (error, authData)=> {
        if (error) {
          reject(error);
        } else {
          this.set('authData', authData);
          resolve(authData);
        }
      });
    });
  },
  invalidate() {
    this.set('authData', '');
  }
});
