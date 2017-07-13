import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('collapsible-panel-body', 'Integration | Component | collapsible panel body', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{collapsible-panel-body}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#collapsible-panel-body}}
      template block text
    {{/collapsible-panel-body}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
