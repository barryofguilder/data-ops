import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['card-header'],
  classNameBindings: ['expanded:show'],
  panelId: null,
  expanded: false
});
