import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mapping-bk-form', 'Integration | Component | mapping bk form', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mapping-bk-form}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mapping-bk-form}}
      template block text
    {{/mapping-bk-form}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
