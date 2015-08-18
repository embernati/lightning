import Ember from 'ember';

export function dateFormat(value, options) {
  if (!options.format) {
    throw Error('moment-format is expecting format to be defined.');
  }
  if (value.length !== 1) {
    throw Error('moment-format is expecting one value.');
  }

  let momentValue = moment(value[0]);

  if (!momentValue.isValid()) {
    throw Error('moment-format is expecting valid Date.');
  }

  return momentValue.format(options.format);
}

export default Ember.Helper.helper(dateFormat);
