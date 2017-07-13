import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card'],
  expanded: false,
  panelId: null,

  init() {
    this._super(...arguments);

    this.set('panelId', `collapsible-panel-${Math.random().toString(36).substr(2, 9)}`);
  },

  actions: {
    toggleBody(expanded) {
      if (!this.get('isDestroyed')) {
        this.set('expanded', expanded);
      }
    }
  }
});
