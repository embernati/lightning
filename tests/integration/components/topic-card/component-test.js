import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('topic-card', 'Integration | Component | topic card', {
  integration: true
});

test('it renders', function(assert) {
  assert.expect(4);
  this.render(hbs`{{topic-card topic=testTopic}}`);

  var submittedDate = new Date(1);

  this.set('testTopic', { description: '', submittedDate: submittedDate });
  assert.equal(this.$('.description').text().trim(), '');

  this.set('testTopic', { description: 'Explain how to integration test better', submittedDate: submittedDate });
  assert.equal(this.$('.description').text().trim(), 'Explain how to integration test better');

  this.set('testTopic', { description: 'Now Test', submittedDate: new Date() });
  var descriptionText = this.$('.description').text();
  assert.ok(descriptionText.indexOf('Now Test') !== -1);
  assert.ok(descriptionText.indexOf('New!') !== -1);
});
