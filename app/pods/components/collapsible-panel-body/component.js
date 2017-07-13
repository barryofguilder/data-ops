import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['collapse'],
  classNameBindings: ['expanded:show'],
  attributeBindings: ['panelId:id'],
  panelId: null,
  expanded: false,

  didInsertElement() {
    this._super(...arguments);

    this.$().on('hidden.bs.collapse', () => {
      this.get('onToggle')(false);
    });

    this.$().on('show.bs.collapse', () => {
      this.get('onToggle')(true);
    });
  }
});
