import { dateFormat } from '../../../helpers/date-format';
import { module, test } from 'qunit';

module('Unit | Helper | date format');

// Replace this with your real tests.
test('it works', function(assert) {
  var result = dateFormat([new Date()], { format: 'MMM' });
  assert.ok(result);
});
