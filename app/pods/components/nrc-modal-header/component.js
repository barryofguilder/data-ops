import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['modal-header'],

  actions: {
    close() {
      this.sendAction('close');
    }
  }
});
