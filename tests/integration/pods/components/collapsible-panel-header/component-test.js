import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('collapsible-panel-header', 'Integration | Component | collapsible panel header', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{collapsible-panel-header}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#collapsible-panel-header}}
      template block text
    {{/collapsible-panel-header}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
