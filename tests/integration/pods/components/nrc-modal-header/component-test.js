import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nrc-modal-header', 'Integration | Component | nrc modal header', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nrc-modal-header}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#nrc-modal-header}}
      template block text
    {{/nrc-modal-header}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
