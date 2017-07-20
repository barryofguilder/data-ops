import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'button',
  attributeBindings: ['message:title'],
  message: null,

  didInsertElement() {
    this._super(...arguments);

    if (Ember.isPresent(this.get('message'))) {
      this._initializeTooltips();
    }
  },

  _initializeTooltips() {
    this.$().tooltip({
      placement: 'right'
    });
  }
});
