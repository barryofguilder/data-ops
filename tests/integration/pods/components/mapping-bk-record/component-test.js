import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('mapping-bk-record', 'Integration | Component | mapping bk record', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{mapping-bk-record}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#mapping-bk-record}}
      template block text
    {{/mapping-bk-record}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
