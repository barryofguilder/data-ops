import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('nrc-modal-body', 'Integration | Component | nrc modal body', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{nrc-modal-body}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#nrc-modal-body}}
      template block text
    {{/nrc-modal-body}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
