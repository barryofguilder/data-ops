import Ember from 'ember';
import CHANNEL_STATE from 'data-ops/utils/channel-constants';

export default Ember.Component.extend({
  tagName: 'span',
  classNames: ['badge'],
  classNameBindings: ['stateClass'],

  state: null,
  stateClass: Ember.computed('state', function() {
    let state = this.get('state');

    if (state === CHANNEL_STATE.ACTIVE) {
      return 'badge-success';
    } else if (state === CHANNEL_STATE.INACTIVE) {
      return 'badge-default';
    } else if (state === CHANNEL_STATE.DEBUG) {
      return 'badge-warning';
    }
  })
});
