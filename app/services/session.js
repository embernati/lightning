import Ember from 'ember';
import config from 'lightning/config/environment';

export default Ember.Service.extend({
  firebase: Ember.computed(function() {
    return new Firebase(config.firebase);
  }),
  store: Ember.inject.service(),
  currentUser: null,
  isAuthenticated: Ember.computed.notEmpty('authData'),
  notAuthenticated: Ember.computed.not('isAuthenticated'),
  authData: Ember.computed({
    get() {
      return this.get('firebase').getAuth();
    },
    set(key, value) {
      return value;
    }
  }),
  loadCurrentUser() {
    return this.get('store')
    .find('user', this.get('authData.github.username'))
    .catch(()=> {
      return this.get('store')
      .createRecord('user', {
        id: this.get('authData.github.username'),
        username: this.get('authData.github.username'),
        avatar: this.get('authData.github.cachedUserProfile.avatar_url')
      })
      .save();
    })
    .then((currentUser)=>{
      this.set('currentUser', currentUser);
    });
  },
  authenticate() {
    return new Ember.RSVP.Promise((resolve, reject)=> {
      this.get('firebase').authWithOAuthPopup('github', (error, authData)=> {
        if (error) {
          reject(error);
        } else {
          this.set('authData', authData);
          resolve();
        }
      });
    })
    .then(()=> {
      return this.loadCurrentUser();
    });
  },
  invalidate() {
    this.get('firebase').unauth();
    window.location = '/';
  }
});
