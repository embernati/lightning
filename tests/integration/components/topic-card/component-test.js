import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import Ember from 'ember';

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

test('upvoting adds a user to the upvoters list', function(assert) {
  this.set('testTopic', { upvoters: Ember.A() });
  this.render(hbs`{{topic-card topic=testTopic}}`);
  this.$('.upvote.icon-btn').click();
  assert.ok(this.$('.fa.fa-thumbs-up').length === 1);
  assert.ok(this.$('.fa.fa-thumbs-o-up').length === 0);
  assert.ok(this.get('testTopic.upvoters.length') === 1);
});

test('a user can remove their upvote', function(assert) {
  this.set('testTopic', { upvoters: Ember.A([null]) });
  this.render(hbs`{{topic-card topic=testTopic}}`);
  this.$('.upvote.icon-btn').click();
  assert.ok(this.$('.fa.fa-thumbs-up').length === 0);
  assert.ok(this.$('.fa.fa-thumbs-o-up').length === 1);
  assert.ok(this.get('testTopic.upvoters.length') === 0);
});
