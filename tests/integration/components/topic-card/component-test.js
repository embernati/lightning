import { skip } from 'qunit';
import { moduleForComponent } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';


moduleForComponent('topic-card', 'Integration | Component | topic card', {
  integration: true
});

skip('it renders', function(assert) {
  assert.expect(2);

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{topic-card}}`);

  assert.equal(this.$().text(), '');

  // Template block usage:
  this.render(hbs`
    {{#topic-card}}
      template block text
    {{/topic-card}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
