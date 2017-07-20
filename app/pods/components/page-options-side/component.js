import Ember from 'ember';

export default Ember.Component.extend({
  classNameBindings: ['sideClasses'],

  side: null,
  sideClasses: Ember.computed('side', function() {
    return `pull-${this.get('side')}`;
  })
});
