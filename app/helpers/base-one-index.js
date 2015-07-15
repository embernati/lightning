import Ember from 'ember';

export function baseOneIndex(index) {
  return parseInt(index)+1;
}

export default Ember.Helper.helper(baseOneIndex);
